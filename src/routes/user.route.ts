import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller";
import { validationMiddleware } from "../middleware/validation.middleware";
import { UserDto } from "../dtos/user.dto";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/register", validationMiddleware(UserDto), register);
router.post("/login", validationMiddleware(UserDto), login);
router.post("/logout", authMiddleware, logout);

export default router;
