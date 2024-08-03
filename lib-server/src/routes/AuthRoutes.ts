import express from "express";
import AuthController from "../controllers/AuthController";
import { validateUser, validateLogin } from "../middlewares/validation";
import { authenticate, verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/register", validateUser, AuthController.handleRegister);
router.post("/login", validateLogin, AuthController.handleLogin);
router.get("/account", verifyToken, AuthController.getAccountDetails);
// router.get(
//   "/account",
//   verifyToken,
//   (req, res, next) => {
//     console.log("Inside /account route handler");
//     next();
//   },
//   AuthController.getAccountDetails
// );

export default router;
