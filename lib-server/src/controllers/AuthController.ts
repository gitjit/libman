import { Request, Response } from "express";
import { IUser } from "../models/User";
import { register, login, getUser } from "../services/UserService";
import { json } from "stream/consumers";
import { config } from "../config";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types";

import {
  InvalidCredentialsError,
  UserNotFoundError,
} from "../errors/AuthErrors";

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

    //generate jwt
    const token = jwt.sign(
      { _id: loggedInUser._id, email: loggedInUser.email } as JWTPayload,
      config.server.jwt_secret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token,
      user: {
        _id: loggedInUser._id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
      },
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

async function getAccountDetails(req: Request, res: Response) {
  try {
    const user = req.user; // jwt payload inserted by the middleware
    console.log("GetAccountDetails", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userInfo = await getUser(user._id);
    return res.status(200).json({
      _id: userInfo._id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
    });
  } catch (error) {
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

export default { handleRegister, handleLogin, getAccountDetails };
