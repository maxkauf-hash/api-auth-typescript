import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { getJwtToken } from "./token";

export const hashApiKey = async (apiKey: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(apiKey, saltRounds);
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const compareApiKey = async (
  apiKey: string,
  hashApiKey: string
): Promise<Boolean> => {
  return await bcrypt.compare(apiKey, hashApiKey);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<Boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateTokens = async (
  payload: Record<string, any>,
  key: string,
  expiresIn: string
): Promise<string> => {
  const token = jwt.sign({ payload }, key, {
    expiresIn: expiresIn,
  });
  return token;
};
