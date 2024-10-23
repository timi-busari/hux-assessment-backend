"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@jest-mock/express");
const mongoose_1 = __importDefault(require("mongoose"));
const contact_model_1 = __importDefault(require("../models/contact.model"));
const contact_controller_1 = require("../controllers/contact.controller");
jest.mock("../models/contact.model");
describe("Contact Controller", () => {
    const userId = new mongoose_1.default.Types.ObjectId().toString();
    const mockContact = {
        _id: new mongoose_1.default.Types.ObjectId().toString(), // Generating a mock user ID
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
            const req = (0, express_1.getMockReq)({
                body: {
                    firstName: "Timi",
                    lastName: "Busari",
                    phoneNumber: "+2348121160856",
                },
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)();
            const saveMock = jest.fn().mockResolvedValueOnce(mockContact); // Mocking save method to resolve with mockContact
            contact_model_1.default.mockImplementation(() => ({
                save: saveMock,
            }));
            await (0, contact_controller_1.createContact)(req, res);
            expect(contact_model_1.default).toHaveBeenCalledWith({
                firstName: "Timi",
                lastName: "Busari",
                phoneNumber: "+2348121160856",
                user: userId,
            });
            expect(saveMock).toHaveBeenCalled(); // Ensuring save method was called
            expect(res.status).toHaveBeenCalledWith(201);
        });
        it("should handle errors during contact creation", async () => {
            const req = (0, express_1.getMockReq)({
                // Mocking the request object
                body: {
                    firstName: "Timi",
                    lastName: "Busari",
                    phoneNumber: "+2348121160856",
                },
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)(); // Mocking the response object
            const error = new Error("Database error");
            const saveMock = jest.fn().mockRejectedValueOnce(error);
            contact_model_1.default.mockImplementation(() => ({
                save: saveMock,
            }));
            await (0, contact_controller_1.createContact)(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
    describe("getAllContacts", () => {
        it("should return all contacts for a user", async () => {
            const req = (0, express_1.getMockReq)({
                // Mocking the request object
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)(); // Mocking the response object
            const mockContacts = [mockContact];
            contact_model_1.default.find.mockResolvedValueOnce(mockContacts);
            await (0, contact_controller_1.getAllContacts)(req, res);
            expect(contact_model_1.default.find).toHaveBeenCalledWith({ user: userId });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockContacts);
        });
        it("should handle errors when fetching contacts", async () => {
            const req = (0, express_1.getMockReq)({
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)();
            const error = new Error("Database error");
            contact_model_1.default.find.mockRejectedValueOnce(error);
            await (0, contact_controller_1.getAllContacts)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
    describe("getContact", () => {
        it("should return a specific contact", async () => {
            const req = (0, express_1.getMockReq)({
                params: { id: mockContact._id },
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)();
            contact_model_1.default.findOne.mockResolvedValueOnce(mockContact);
            await (0, contact_controller_1.getContact)(req, res);
            expect(contact_model_1.default.findOne).toHaveBeenCalledWith({
                _id: mockContact._id,
                user: userId,
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockContact);
        });
        it("should return 404 when contact is not found", async () => {
            const req = (0, express_1.getMockReq)({
                params: { id: mockContact._id },
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)();
            contact_model_1.default.findOne.mockResolvedValueOnce(null);
            await (0, contact_controller_1.getContact)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Contact not found" });
        });
        it("should handle errors when fetching a contact", async () => {
            const req = (0, express_1.getMockReq)({
                params: { id: mockContact._id },
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)();
            const error = new Error("Database error");
            contact_model_1.default.findOne.mockRejectedValueOnce(error);
            await (0, contact_controller_1.getContact)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
    describe("updateContact", () => {
        it("should update a contact successfully", async () => {
            const updatedContact = { ...mockContact, lastName: "Busari" };
            const req = (0, express_1.getMockReq)({
                params: { id: mockContact._id },
                user: { id: userId },
                body: { lastName: "Busari" },
            });
            const { res } = (0, express_1.getMockRes)();
            contact_model_1.default.findOneAndUpdate.mockResolvedValueOnce(updatedContact);
            await (0, contact_controller_1.updateContact)(req, res);
            expect(contact_model_1.default.findOneAndUpdate).toHaveBeenCalledWith({ _id: mockContact._id, user: userId }, { lastName: "Busari" }, { new: true, runValidators: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedContact);
        });
        it("should return 404 when contact to update is not found", async () => {
            const req = (0, express_1.getMockReq)({
                params: { id: mockContact._id },
                user: { id: userId },
                body: { lastName: "Busari" },
            });
            const { res } = (0, express_1.getMockRes)();
            contact_model_1.default.findOneAndUpdate.mockResolvedValueOnce(null);
            await (0, contact_controller_1.updateContact)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Contact not found" });
        });
        it("should handle errors during contact update", async () => {
            const req = (0, express_1.getMockReq)({
                params: { id: mockContact._id },
                user: { id: userId },
                body: { lastName: "Busari" },
            });
            const { res } = (0, express_1.getMockRes)();
            const error = new Error("Database error");
            contact_model_1.default.findOneAndUpdate.mockRejectedValueOnce(error);
            await (0, contact_controller_1.updateContact)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
    describe("deleteContact", () => {
        it("should delete a contact successfully", async () => {
            const req = (0, express_1.getMockReq)({
                params: { id: mockContact._id },
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)();
            contact_model_1.default.findOneAndDelete.mockResolvedValueOnce(mockContact);
            await (0, contact_controller_1.deleteContact)(req, res);
            expect(contact_model_1.default.findOneAndDelete).toHaveBeenCalledWith({
                _id: mockContact._id,
                user: userId,
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Contact deleted successfully",
            });
        });
        it("should return 404 when contact to delete is not found", async () => {
            const req = (0, express_1.getMockReq)({
                params: { id: mockContact._id },
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)();
            contact_model_1.default.findOneAndDelete.mockResolvedValueOnce(null);
            await (0, contact_controller_1.deleteContact)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Contact not found" });
        });
        it("should handle errors during contact deletion", async () => {
            const req = (0, express_1.getMockReq)({
                params: { id: mockContact._id },
                user: { id: userId },
            });
            const { res } = (0, express_1.getMockRes)();
            const error = new Error("Database error");
            contact_model_1.default.findOneAndDelete.mockRejectedValueOnce(error);
            await (0, contact_controller_1.deleteContact)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: error.message });
        });
    });
});
