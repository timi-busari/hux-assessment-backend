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
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
