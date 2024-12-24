import { Pool, RowDataPacket } from "mysql2/promise";
import { connectToDatabase } from "../config/db.config";

export class CrudModel<T> {
  private static db: Pool = connectToDatabase();
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public static getDb(): Pool {
    if (!this.db) {
      throw new Error("Database not initialized");
    }
    return this.db;
  }

  async findAll(): Promise<T[] | null> {
    try {
      const [rows]: [RowDataPacket[], any] = await CrudModel.db.query(
        `SELECT * FROM ${this.tableName}`
      );
      return rows.length > 0 ? (rows as T[]) : null;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async findOne(id: number): Promise<T | null> {
    try {
      const [rows]: [RowDataPacket[], any] = await CrudModel.db.query(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id]
      );
      return rows.length > 0 ? (rows[0] as T) : null;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async create(data: T): Promise<{ message: string } | null> {
    try {
      const keys = Object.keys(data).join(", ");
      const placeholders = Object.keys(data)
        .map(() => "?")
        .join(", ");
      const values = Object.values(data);

      await CrudModel.db.query(
        `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`,
        values
      );
      return { message: "Item added successfully" };
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async update(
    id: number,
    data: Partial<T>
  ): Promise<{ message: string } | null> {
    try {
      const updates = Object.keys(data)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = [...Object.values(data), id];

      await CrudModel.db.query(
        `UPDATE ${this.tableName} SET ${updates} WHERE id = ?`,
        values
      );
      return { message: "Item updated successfully" };
    } catch (error) {
      throw new Error("Internal server error");
    }
  }

  async delete(id: number): Promise<{ message: string } | null> {
    try {
      await CrudModel.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [
        id,
      ]);
      return { message: "Item deleted successfully" };
    } catch (error) {
      throw new Error("Internal server error");
    }
  }
}
