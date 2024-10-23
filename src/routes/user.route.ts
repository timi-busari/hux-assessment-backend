import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller";
import { validationMiddleware } from "../middleware/validation.middleware";
import { UserDto } from "../dtos/user.dto";
const router = Router();

router.post("/register", validationMiddleware(UserDto), register);
router.post("/login", validationMiddleware(UserDto), login);
router.post("/logout", logout);

export default router;
