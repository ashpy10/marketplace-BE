import db from "./client.js";
import { products } from "./queries/products.js";

// Seed function to populate the database
async function seed() {
  try {
    // Drop existing tables
    await db.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
    `);

    // Create products table
    await db.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT NOT NULL
      );
    `);

    // Create reviews table
    await db.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        product_id INTEGER NOT NULL REFERENCES products(id),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
      );
    `);

    // Insert products
    const productValues = products.map(product => [
      product.title,
      product.description,
      product.price,
      product.image_url
    ]);

    for (const [title, description, price, image_url] of productValues) {
      await db.query(`
        INSERT INTO products (title, description, price, image_url)
        VALUES ($1, $2, $3, $4);
      `, [title, description, price, image_url]);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

export { seed };


