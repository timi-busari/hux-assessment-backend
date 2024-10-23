import { Response } from "express";
import { getMockReq, getMockRes } from "@jest-mock/express";
import mongoose from "mongoose";
import Contact from "../models/contact.model";
import {
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller";
import { AuthRequest } from "../middleware/auth.middleware";

jest.mock("../models/contact.model");

describe("Contact Controller", () => {
  const userId = new mongoose.Types.ObjectId().toString();
  // Mock the Contact model
  const mockSort = jest.fn();

  jest.mock("../models/contact.model", () => ({
    find: jest.fn().mockReturnThis(),
    sort: mockSort,
  }));

  const mockContact = {
    _id: new mongoose.Types.ObjectId().toString(), // Generating a mock user ID
    firstName: "Timi",
    lastName: "Busari",
    phoneNumber: "+2348121160856",
    user: userId,
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clearing mocks before each test to ensure isolation
  });

  describe("createContact", () => {
    it("should create a new contact successfully", async () => {
      const req = getMockReq({
        body: {
          firstName: "Timi",
          lastName: "Busari",
          phoneNumber: "+2348121160856",
        },
        user: { id: userId },
      }) as AuthRequest;

      const { res } = getMockRes();

      const saveMock = jest.fn().mockResolvedValueOnce(mockContact); // Mocking save method to resolve with mockContact
      (Contact as any).mockImplementation(() => ({
        save: saveMock,
      }));

      await createContact(req, res);

      expect(Contact).toHaveBeenCalledWith({
        firstName: "Timi",
        lastName: "Busari",
        phoneNumber: "+2348121160856",
        user: userId,
      });
      expect(saveMock).toHaveBeenCalled(); // Ensuring save method was called
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should handle errors during contact creation", async () => {
      const req = getMockReq({
        // Mocking the request object
        body: {
          firstName: "Timi",
          lastName: "Busari",
          phoneNumber: "+2348121160856",
        },
        user: { id: userId },
      }) as AuthRequest;

      const { res } = getMockRes(); // Mocking the response object

      const error = new Error("Database error");
      const saveMock = jest.fn().mockRejectedValueOnce(error);
      (Contact as any).mockImplementation(() => ({
        save: saveMock,
      }));

      await createContact(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe("getAllContacts", () => {
    describe("getAllContacts", () => {
      it("should return all contacts for a user sorted by createdAt", async () => {
        // Arrange
        const req = getMockReq({
          user: { id: userId },
        }) as AuthRequest;

        const { res } = getMockRes();

        const mockContacts = [mockContact];

        // mock the chained methods
        (Contact.find as jest.Mock).mockReturnValue({
          sort: mockSort.mockResolvedValue(mockContacts),
        });

        await getAllContacts(req, res);

        expect(Contact.find).toHaveBeenCalledWith({ user: userId });
        expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockContacts);
      });

      it("should handle errors appropriately", async () => {
        const req = getMockReq({
          user: { id: userId },
        }) as AuthRequest;

        const { res } = getMockRes();

        const errorMessage = "Database error";
        (Contact.find as jest.Mock).mockReturnValue({
          sort: mockSort.mockRejectedValue(new Error(errorMessage)),
        });

        await getAllContacts(req, res);

        expect(Contact.find).toHaveBeenCalledWith({ user: userId });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
      });
    });
  });

  describe("getContact", () => {
    it("should return a specific contact", async () => {
      const req = getMockReq({
        params: { id: mockContact._id },
        user: { id: userId },
      }) as AuthRequest;

      const { res } = getMockRes();

      (Contact.findOne as jest.Mock).mockResolvedValueOnce(mockContact);

      await getContact(req, res);

      expect(Contact.findOne).toHaveBeenCalledWith({
        _id: mockContact._id,
        user: userId,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockContact);
    });

    it("should return 404 when contact is not found", async () => {
      const req = getMockReq({
        params: { id: mockContact._id },
        user: { id: userId },
      }) as AuthRequest;

      const { res } = getMockRes();

      (Contact.findOne as jest.Mock).mockResolvedValueOnce(null);

      await getContact(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Contact not found" });
    });

    it("should handle errors when fetching a contact", async () => {
      const req = getMockReq({
        params: { id: mockContact._id },
        user: { id: userId },
      }) as AuthRequest;

      const { res } = getMockRes();

      const error = new Error("Database error");
      (Contact.findOne as jest.Mock).mockRejectedValueOnce(error);

      await getContact(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe("updateContact", () => {
    it("should update a contact successfully", async () => {
      const updatedContact = { ...mockContact, lastName: "Busari" };
      const req = getMockReq({
        params: { id: mockContact._id },
        user: { id: userId },
        body: { lastName: "Busari" },
      }) as AuthRequest;

      const { res } = getMockRes();

      (Contact.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(
        updatedContact
      );

      await updateContact(req, res);

      expect(Contact.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockContact._id, user: userId },
        { lastName: "Busari" },
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedContact);
    });

    it("should return 404 when contact to update is not found", async () => {
      const req = getMockReq({
        params: { id: mockContact._id },
        user: { id: userId },
        body: { lastName: "Busari" },
      }) as AuthRequest;

      const { res } = getMockRes();

      (Contact.findOneAndUpdate as jest.Mock).mockResolvedValueOnce(null);

      await updateContact(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Contact not found" });
    });

    it("should handle errors during contact update", async () => {
      const req = getMockReq({
        params: { id: mockContact._id },
        user: { id: userId },
        body: { lastName: "Busari" },
      }) as AuthRequest;

      const { res } = getMockRes();

      const error = new Error("Database error");
      (Contact.findOneAndUpdate as jest.Mock).mockRejectedValueOnce(error);

      await updateContact(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe("deleteContact", () => {
    it("should delete a contact successfully", async () => {
      const req = getMockReq({
        params: { id: mockContact._id },
        user: { id: userId },
      }) as AuthRequest;

      const { res } = getMockRes();

      (Contact.findOneAndDelete as jest.Mock).mockResolvedValueOnce(
        mockContact
      );

      await deleteContact(req, res);

      expect(Contact.findOneAndDelete).toHaveBeenCalledWith({
        _id: mockContact._id,
        user: userId,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Contact deleted successfully",
      });
    });

    it("should return 404 when contact to delete is not found", async () => {
      const req = getMockReq({
        params: { id: mockContact._id },
        user: { id: userId },
      }) as AuthRequest;

      const { res } = getMockRes();

      (Contact.findOneAndDelete as jest.Mock).mockResolvedValueOnce(null);

      await deleteContact(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Contact not found" });
    });

    it("should handle errors during contact deletion", async () => {
      const req = getMockReq({
        params: { id: mockContact._id },
        user: { id: userId },
      }) as AuthRequest;

      const { res } = getMockRes();

      const error = new Error("Database error");
      (Contact.findOneAndDelete as jest.Mock).mockRejectedValueOnce(error);

      await deleteContact(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
