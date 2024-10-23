import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  updateContact,
} from "../controllers/contact.controller";
import { validationMiddleware } from "../middleware/validation.middleware";
import { ContactDto } from "../dtos/contact.dto";

const router = Router();

router.post(
  "/",
  validationMiddleware(ContactDto),
  authMiddleware,
  createContact
);

router.get("/", authMiddleware, getAllContacts);
router.get("/:id", authMiddleware, getContact);
router.put(
  "/:id",
  authMiddleware,
  validationMiddleware(ContactDto),
  updateContact
);
router.delete("/:id", authMiddleware, deleteContact);

export default router;
