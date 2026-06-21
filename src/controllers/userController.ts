import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const saveUser = async (req: Request, res: Response) => {
    try {
        const { name, email, image } = req.body;

        // Check if the user is already registered
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(200).json({ success: true, data: existingUser });
            return;
        }

        // Created New User
        const user = await User.create({ name, email, image, role: "user" });
        res.status(201).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    };
};

// Registration(Email And Password)
export const registerUser = async (req: Request, res: Response) => {
    try{
        const{name, email, password, phone, address, image} = req.body;

        // Check if the user is already registered
        const existingUser = await User.findOne({email});
        if(existingUser) {
           res.status(400).json({success: false, message: "Email already"})         
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone, 
            address,
            image,
            role: "user",
            provider: "credentials",
        });

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            image: user.image,
            role: user.role,
        };

        res.status(201).json({success: true, data: userResponse});
    }
    catch(error){
        res.status(500).json({success: false, message: "Server error", error});
    }
}


// Find the user role
export const getUserRole = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, role: user.role });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    };
};

// Request to become a seller
export const becomeSellerRequest = async (req: Request, res: Response) => {
    try {
        const { email, shopName, shopDescription } = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            { shopName, shopDescription, role: "seller", isApproved: false },
            { new: true }
        )
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error })
    }
}

// Admin can see all user
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error })
    }
}

// Admin will approve the seller
export const approveSeller = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        );
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error })
    }
}

// Admin role will change
export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true }
        );
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
}