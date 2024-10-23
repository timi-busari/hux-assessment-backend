import { Response } from "express";
import Contact, { IContact } from "../models/contact.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const createContact = async (req: AuthRequest, res: Response) => {
  const { firstName, lastName, phoneNumber } = req.body;
  try {
    const contact: IContact = new Contact({
      firstName,
      lastName,
      phoneNumber,
      user: req.user.id,
    });
    await contact.save();
    res.status(201).json(contact);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllContacts = async (req: AuthRequest, res: Response) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.status(200).json(contacts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getContact = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true } // Return updated document
    );

    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
