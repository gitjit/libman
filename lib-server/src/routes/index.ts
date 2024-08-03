import { Express, Request, Response } from "express";
import authRoutes from "./AuthRoutes";

export function registerRoutes(app: Express) {
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is running properly" });
  });

  //   app.get("/auth/account", (req, res) => {
  //     console.log("Request headers:", JSON.stringify(req.headers));
  //     const token = req.cookies.authToken; // Assuming the token is stored in cookies
  //     console.log("auth/account-token", token);
  //     if (!token) {
  //       return res.status(403).json({ message: "No token provided" });
  //     }
  //   });

  app.use("/auth", authRoutes);
}
