import Stripe from "stripe";
import User from "../../models/User";
import Product from "../../models/Product";
import Order from "../../models/Order";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const {items, email, shippingAddress, phone} = req.body;

        if(!items?.length) {
            res.status(400).json({success: false, message: "Cart is empty"});
            return;
        }

        const user = await User.findOne({email});

        if (!user) {
            res.status(404).json({success: false, message: "User not Found"});
            return;
        }

        const ids = items.map((i: {_id: string}) => i._id);
        const products = await Product.find({_id: {$id: ids}, isApproved: true});

        const orderItems = [];
        for (const item of items) {
            const product = products.find((p) => String(p._id) === items._id);
            const quantity = Number(item.quantity) || 1;

            if(!product) {
                res.status(400).json({success: false, message: "A product is no longer available"});
                return;
            }

            if(product.stock < quantity) {
                res.status(400).json({success: false, message: `Not enough stock for ${product.name}`});
                return;
            }

            orderItems.push({
                product: String(product._id),
                sellerId: product.sellerId,
                name: product.name,
                price: product.price,
                quantity,
                image: product.image,
            })
        }

        
    }
}