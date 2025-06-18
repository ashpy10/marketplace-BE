import dotenv from "dotenv";
import db from "../client.js";

dotenv.config();

// Get all products
async function getAllProducts() {
  try {
    const { rows } = await db.query(`
      SELECT * FROM products;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Get a single product by ID
async function getProductById(id) {
  try {
    const { rows } = await db.query(`
      SELECT * FROM products
      WHERE id = $1;
    `, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}


export {
  getAllProducts,
  getProductById
};

