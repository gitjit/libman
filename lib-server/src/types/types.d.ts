import { Request } from "express";
import JwtPayLoad from "./index";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}
