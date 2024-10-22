import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createContact } from "../controllers/contact.controller";

const router = Router();

router.post("/", authMiddleware, createContact);

export default router;
