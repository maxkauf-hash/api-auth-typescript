import crypto from "crypto";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";

export const generateApiKey = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

export const encrypt = (text: string, key: string): string => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decrypt = (encryptedText: string, key: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    if (bytes.sigBytes > 0) {
      return bytes.toString(CryptoJS.enc.Utf8);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}; 