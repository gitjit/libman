import express from "express";
import AuthController from "../controllers/AuthController";
import { validateUser, validateLogin } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/register", validateUser, AuthController.handleRegister);
router.post("/login", validateLogin, AuthController.handleLogin);
router.get("/account", authenticate, AuthController.getAccountDetails);

export default router;
