"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.getContact = exports.getAllContacts = exports.createContact = void 0;
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
const getAllContacts = async (req, res) => {
    try {
        const contacts = await contact_model_1.default.find({ user: req.user.id });
        res.status(200).json(contacts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllContacts = getAllContacts;
const getContact = async (req, res) => {
    try {
        const contact = await contact_model_1.default.findOne({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
            return;
        }
        res.status(200).json(contact);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getContact = getContact;
const updateContact = async (req, res) => {
    try {
        const contact = await contact_model_1.default.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true, runValidators: true } // Return updated document
        );
        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
            return;
        }
        res.status(200).json(contact);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateContact = updateContact;
const deleteContact = async (req, res) => {
    try {
        const contact = await contact_model_1.default.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
            return;
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteContact = deleteContact;
