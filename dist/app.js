"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const contact_route_1 = __importDefault(require("./routes/contact.route"));
// load environment variables
dotenv_1.default.config();
// initialize Express app
const app = (0, express_1.default)();
// middleware to parse JSON requests
app.use(express_1.default.json());
// connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI || "")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));
// routes
app.use("/api/users", user_route_1.default);
app.use("/api/contacts", contact_route_1.default);
exports.default = app;
