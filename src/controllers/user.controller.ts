import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const existingUser: IUser | null = await User.findOne({ username });

    if (existingUser) {
      res
        .status(401)
        .json({ message: `User ${username} already has an account` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser | null = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const comparePassword = await user.comparePassword(password);

    if (!comparePassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    // set JWT token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token"); // clears the JWT cookie
  res.status(200).json({ message: "Logout successful" });
};
