import { CrudModel } from "../models/CrudModel";
import { Users } from "../types/index";
import { RowDataPacket } from "mysql2/promise";
import nodemailer from "nodemailer";

export class AuthModel extends CrudModel<Users> {
  constructor() {
    super("users");
  }
  static async findOneByEmail(email: string): Promise<Users | null> {
    try {
      const [rows]: [RowDataPacket[], any] = await AuthModel.getDb().query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return rows.length > 0 ? (rows[0] as Users) : null;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  static async sendResetEmail(email: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      // Configuration de votre transporteur
    });

    const resetUrl = `http://yourdomain.com/reset-password?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      text: `Click this link to reset your password: ${resetUrl}`,
    });
  }
}
