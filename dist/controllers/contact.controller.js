"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = void 0;
const contact_model_1 = __importDefault(require("../models/contact.model"));
const createContact = async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;
    try {
        const contact = new contact_model_1.default({
            firstName,
            lastName,
            phoneNumber,
            user: req.user.id,
        });
        await contact.save();
        res.status(201).json(contact);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createContact = createContact;
