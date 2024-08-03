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

// Verify token from cookie
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("Inside Verify token");
  const token = req.cookies.authToken;
  // Log only the necessary parts of the request object
  console.log("Request headers:", JSON.stringify(req.headers));
  console.log("Request cookies:", JSON.stringify(req.cookies));

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  console.log("Verifying token", token);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export { authenticate, verifyToken };
