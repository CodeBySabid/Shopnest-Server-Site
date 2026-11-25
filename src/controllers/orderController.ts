import Stripe from "stripe";
import User from "../models/User";
import Product from "../models/Product";
import Order from "../models/Order";
import { Request, Response } from "express";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { items, email, shippingAddress, phone } = req.body;

        if (!items?.length) {
            res.status(400).json({ success: false, message: "Cart is empty" });
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ success: false, message: "User not Found" });
            return;
        }

        const ids = items.map((i: { _id: string }) => i._id);
        const products = await Product.find({
            _id: { $in: ids },
            isApproved: true
        });

        const orderItems = [];
        for (const item of items) {
            const product = products.find((p) => String(p._id) === item._id);
            const quantity = Number(item.quantity) || 1;

            if (!product) {
                res.status(400).json({ success: false, message: "A product is no longer available" });
                return;
            }

            if (product.stock < quantity) {
                res.status(400).json({ success: false, message: `Not enough stock for ${product.name}` });
                return;
            }

            orderItems.push({
                productId: String(product._id),
                sellerId: product.sellerId,
                name: product.name,
                price: product.price,
                quantity,
                image: product.image,
            })
        }

        const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const shipping = subtotal >= 50 ? 0 : 5;
        const totalPrice = subtotal + shipping;

        const order = await Order.create({
            userId: String(user._id),
            items: orderItems,
            totalPrice,
            shippingAddress,
            phone,
        });

        const lineItems = orderItems.map((i) => ({
            quantity: i.quantity,
            price_date: {
                currency: "usd",
                unit_amount: Math.round(i.price * 100),
                product_data: { name: i.name, images: [i.image] },
            },
        }));

        if(shipping > 0) {
            lineItems.push({
                quantity: 1, 
                price_date: {
                    currency: "usd",
                    unit_amount: shipping * 100,
                    product_data: {name: "Shipping", images: []},
                },
            })
        }

        const session = await getStripe().checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            customer_email: email,
            metadata: { orderId: String(order._id) },
            success_url: `${process.env.CLIENT_URL}/checkout/success?session_id=${CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        })

        order.stripeSessionId = session.id;
        await order.save();

        res.status(200).json({ success: true, url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Could not start checkout" });
    }
};

export const confirmOrder = async (req: Request, res: Response) => {
    try{
        const sessionId = req.query.session_id as string;
        if(!sessionId) {
            res.status(400).json({success: false, message: "session_id missing"});
            return;
        }

        const session = await getStripe().checkout.sessions.retrieve(sessionId);
        if(session.payment_status !== "paid") {
            res.status(400).json({success: false, message: "Payment not complete"});
            return;
        }
        
        const order = await Order.findById(session.metadata?.orderId);
        if(!order) {
            res.status(404).json({success: false, message: "Order not found"});
            return;
        }

        if(order.paymentStatus !== "paid") {
            order.paymentStatus = "paid";
            order.status = "processing";
            order.stripePaymentId = session.payment_intent as string;
            await order.save();

            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.productId, {
                    $inc: {stock: -item.quantity},
                });
            }
        }

        res.status(200).json({success: true, data: order});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Server error"});
    }
};