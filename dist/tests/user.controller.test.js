"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
jest.mock("../models/user.model");
describe("User Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // clear mocks before each test
    });
    describe("POST /register", () => {
        it("should register a new user", async () => {
            const newUser = {
                username: "testuser",
                password: "password123",
            };
            user_model_1.default.findOne.mockResolvedValue(null); // No existing user
            user_model_1.default.prototype.save.mockResolvedValue(newUser); // Mock save method
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/api/users/register")
                .send(newUser);
            expect(response.status).toBe(201);
        });
        it("should return 401 if user already exists", async () => {
            const existingUser = {
                username: "testuser",
                password: "password123",
            };
            user_model_1.default.findOne.mockResolvedValue(existingUser); // Existing user
            const response = await (0, supertest_1.default)(app_1.default)
                .post("/api/users/register")
                .send(existingUser);
            expect(response.status).toBe(401);
            expect(response.body.message).toContain("already has an account");
        });
    });
    describe("POST /login", () => {
        it("should log in an existing user", async () => {
            const user = {
                username: "testuser",
                password: "password123",
            };
            const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
            // Mock user retrieval and password comparison
            user_model_1.default.findOne.mockResolvedValue({
                username: user.username,
                password: hashedPassword,
                comparePassword: jest.fn().mockResolvedValue(true),
                _id: "user_id",
            });
            const response = await (0, supertest_1.default)(app_1.default).post("/api/users/login").send(user);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("token");
        });
        it("should return 401 if user not found", async () => {
            user_model_1.default.findOne.mockResolvedValue(null); // No user found
            const response = await (0, supertest_1.default)(app_1.default).post("/api/users/login").send({
                username: "unknownuser",
                password: "password123",
            });
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("User not found");
        });
        it("should return 401 if password is invalid", async () => {
            const user = {
                username: "testuser",
                password: "password123",
            };
            const hashedPassword = await bcryptjs_1.default.hash("password123", 10);
            user_model_1.default.findOne.mockResolvedValue({
                ...user,
                password: hashedPassword,
                comparePassword: jest.fn().mockResolvedValue(false), // Invalid password
            });
            const response = await (0, supertest_1.default)(app_1.default).post("/api/users/login").send(user);
            expect(response.status).toBe(401);
            expect(response.body.message).toBe("Invalid credentials");
        });
    });
    describe("POST /api/users/logout", () => {
        it("should log out a user", async () => {
            const response = await (0, supertest_1.default)(app_1.default).post("/api/users/logout"); // Updated path
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Logout successful"); // Uncomment this line to check the response body
        });
    });
});
