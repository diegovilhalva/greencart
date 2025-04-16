import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validateLoginInput, validateRegisterInput } from "../helpers/validators.js"


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const errorMsg = validateRegisterInput({ name, email, password });

        if (errorMsg) return res.status(400).json({ success: false, message: errorMsg });


        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" })
        }

        const defaultAvatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${name.replace(/ /g, '+')}`;
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar: defaultAvatarUrl
        })

        const savedUser = await newUser.save()
        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password


        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(201).json({ success: true, user: userWithoutPassword })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const errorMsg = validateLoginInput({ email, password });
        if (errorMsg) return res.status(400).json({ success: false, message: errorMsg });

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;


        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};