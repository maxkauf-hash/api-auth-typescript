import mysql, { Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool: Pool;

export const connectToDatabase = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }

  return pool;
};

connectToDatabase();
