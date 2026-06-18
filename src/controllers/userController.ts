import { Request, Response } from "express";
import User from "../models/User";

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

