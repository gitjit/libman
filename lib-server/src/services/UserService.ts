import bcrypt from "bcrypt";
import { config } from "../config";
import { IUser } from "../models/User";
import User, { IUserModel } from "../daos/UserDao";
import {
  UserNotFoundError,
  InvalidCredentialsError,
} from "../errors/AuthErrors";

export async function register(user: IUser): Promise<IUserModel> {
  const ROUNDS = config.server.rounds;
  try {
    const hashPassword = await bcrypt.hash(user.password, ROUNDS);
    const saved = new User({ ...user, password: hashPassword });
    return await saved.save();
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to create user`);
  }
}

export async function login(
  email: string,
  password: string
): Promise<IUserModel> {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new UserNotFoundError("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new InvalidCredentialsError("Invalid credentials");
    }
    return user;
  } catch (error: any) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof InvalidCredentialsError
    ) {
      throw error; // Rethrow custom errors
    }
    console.log(error);
    throw new Error("Unable to login");
  }
}

export async function getUser(id: string): Promise<IUserModel> {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new UserNotFoundError("User not found");
    }
    return user;
  } catch (error) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof InvalidCredentialsError
    ) {
      throw error; // Rethrow custom errors
    }
    console.log(error);
    throw new Error("Unable to find user");
  }
}
