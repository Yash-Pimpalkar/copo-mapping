import { connection as db } from "../config/dbConfig.js";
import { pool } from "../config/dbConfig.js";
import expressAsyncHandler from "express-async-handler";
export const showBranch = expressAsyncHandler(async (req, res) => {
    const sql = "SELECT * FROM branch";
    try {
      const [result] = await pool.query(sql); // Use pool.query for promise-based
      res.status(200).json(result); // Changed to status 200
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

