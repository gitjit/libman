import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const userValidationSchema = {
  create: Joi.object({
    userType: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidationSchema.create.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userValidationSchema.login.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { validateUser, validateLogin };
