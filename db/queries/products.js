import dotenv from "dotenv";
import db from "../client.js";

dotenv.config();

// writing a create function for seeding here -mark //
export async function createProduct({title, description, price, image_url}) {
  const sql = `
    INSERT INTO products (title, description, price, image_url)
    VALUES ($1, $2, $3, $4);
  `;
  const {rows: product} = await db.query(sql,[title, description, price, image_url]);
    return product
}


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

