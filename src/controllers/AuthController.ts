import { Request, Response } from "express";
import { generateTokens, hashPassword } from "../utils/auth";
import { Users } from "types";
import { CrudModel } from "../models/CrudModel";
import { AuthModel } from "../models/AuthModel";

const authController = new CrudModel<Users>("users");

export const AuthController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { password, email }: Users = req.body;

      const hashedPassword = await hashPassword(password);

      const existingUser = await AuthModel.findOneByEmail(email);

      if (existingUser) {
        res.status(409).json({ message: "User already exist" });
        return;
      }

      await authController.create({
        email,
        password: hashedPassword,
      });

      res.json({
        status: 201,
        message: "User registered successfully",
      });
      return;
    } catch (error) {
      res.json({
        status: 500,
        error: error.message,
      });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      message: "User logged in successfully",
    });
  },

  async logout(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      res.json({ status: 401, message: "Unauthorized user" });
      return;
    }
    req.logout((err) => {
      if (err) return res.json({ status: 400, message: "User not logged in" });
      res.json({ status: 200, message: "User logged out successfully" });
    });
  },

  async authStatus(req: Request, res: Response): Promise<void> {
    if (req.user) {
      res.json({
        status: 200,
        message: "User authenticated successfully",
      });
    } else {
      res.json({
        status: 401,
        message: "Unauthorized user",
      });
    }
  },

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.user as Partial<Users>;
    try {
      const user = await AuthModel.findOneByEmail(email);

      if (!user) {
        res.status(404).json({ message: "No user found" });
        return;
      }

      const resetToken = await generateTokens(
        { id: user.id },
        process.env.SECRET_KEY,
        "1h"
      );

      await AuthModel.sendResetEmail(user.email, resetToken);

      res.status(200).json({ email, resetToken });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  },
};
