import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import contactRoutes from "./routes/contact.route";
import cors from "cors";

// load environment variables
dotenv.config();

// initialize Express app
const app: Application = express();

// middleware to parse JSON requests
app.use(express.json());

// Enable CORS for specific origin
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN, // Allow only frontend origin
  })
);

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// routes
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

export default app;
