"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const contact_controller_1 = require("../controllers/contact.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const contact_dto_1 = require("../dtos/contact.dto");
const router = (0, express_1.Router)();
router.post("/", (0, validation_middleware_1.validationMiddleware)(contact_dto_1.ContactDto), auth_middleware_1.authMiddleware, contact_controller_1.createContact);
router.get("/", auth_middleware_1.authMiddleware, contact_controller_1.getAllContacts);
router.get("/:id", auth_middleware_1.authMiddleware, contact_controller_1.getContact);
router.put("/:id", auth_middleware_1.authMiddleware, (0, validation_middleware_1.validationMiddleware)(contact_dto_1.ContactDto), contact_controller_1.updateContact);
router.delete("/:id", auth_middleware_1.authMiddleware, contact_controller_1.deleteContact);
exports.default = router;
