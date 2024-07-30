import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
console.log("JWT secret", JWT_SECRET);
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part , remove the "bearer" term
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT Verify error", err);
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded as JWTPayload;
    next();
  });
};

export { authenticate };
