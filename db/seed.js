import db from "./client.js";
import { products } from "./queries/products.js";

// Seed function to populate the database
async function seed() {
  try {
    // First, drop existing tables if they exist
    console.log("Starting to drop tables...");
    await db.query(`
      DROP TABLE IF EXISTS products CASCADE;
    `);
    console.log("Tables dropped successfully!");

    // Create new tables
    console.log("Starting to create tables...");
    await db.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT NOT NULL
      );
    `);
    console.log("Tables created successfully!");

    // Insert the products data
    const insertProducts = products.map(
      product => db.query(`
        INSERT INTO products (title, description, price, image_url)
        VALUES ($1, $2, $3, $4);
      `, [product.title, product.description, product.price, product.image_url])
    );

    await Promise.all(insertProducts);
    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
    throw error;
  }
}

export { seed };


