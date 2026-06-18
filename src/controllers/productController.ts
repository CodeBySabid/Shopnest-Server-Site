import Product from "../models/Product";
import { Request, Response } from "express";

// All Products Here
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;

    // Created Filter
    const filter: Record<string, unknown> = { isApproved: true };

    if (category) filter.category = category;
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const total = await Product.countDocuments(filter);
    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  };
};

// Will Get One Product
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.status(200).json({ success: true, data: product });
  }
  catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  };
};

// Seller Can Be Add new Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  }
  catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  };
};

