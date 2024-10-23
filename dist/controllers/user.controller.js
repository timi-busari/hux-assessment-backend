"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await user_model_1.default.findOne({ username });
        if (existingUser) {
            res
                .status(401)
                .json({ message: `User ${username} already has an account` });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new user_model_1.default({ username, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ username });
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const comparePassword = await user.comparePassword(password);
        if (!comparePassword) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "defaultsecret", { expiresIn: "1h" });
        // set JWT token in an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.login = login;
const logout = async (_req, res) => {
    res.clearCookie("token"); // clears the JWT cookie
    res.status(200).json({ message: "Logout successful" });
};
exports.logout = logout;
