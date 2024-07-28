import { Request, Response } from "express";
import { IUser } from "../models/User";
import { register, login } from "../services/UserService";
import { json } from "stream/consumers";
import {
  InvalidCredentialsError,
  UserNotFoundError,
} from "../errors/authErrors";

async function handleRegister(req: Request, res: Response) {
  const user: IUser = req.body;
  try {
    console.log(`A request to Register ${JSON.stringify(user)}`);
    const registeredUser = await register(user);
    res.status(201).json({
      message: "User successfully created",
      user: {
        _id: registeredUser._id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Unable to register user at this time",
      error: error.message,
    });
  }
}

async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const loggedInUser = await login(email, password);
    if (!loggedInUser) {
      return res.status(401).json("Invalid credentials");
    }
    return res.status(200).json({
      _id: loggedInUser._id,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      email: loggedInUser.email,
    });
  } catch (error: any) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof InvalidCredentialsError
    ) {
      return res.status(401).json({ message: error.message });
    }
    console.error("Login error:", error);
    return res.status(500).json({ message: "Unable to login at this time" });
  }
}

export default { handleRegister, handleLogin };
