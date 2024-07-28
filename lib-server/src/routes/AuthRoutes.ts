import express from "express";
import AuthController from "../controllers/AuthController";
import { validateUser, validateLogin } from "../middlewares/validation";

const router = express.Router();

router.post("/register", validateUser, AuthController.handleRegister);
router.post("/login", validateLogin, AuthController.handleLogin);

export default router;
