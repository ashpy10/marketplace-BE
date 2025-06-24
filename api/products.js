import express from "express";
import { requireUser } from "../app.js";
import { getAllProducts, getProductById } from "../db/queries/products.js";

const router = express.Router();

// GET /products - Get all products
router.get("/", async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /products/:id - Get a specific product
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /products/:id/reviews - Get reviews for a product
router.get("/:id/reviews", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if product exists
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Get reviews for the product
        const { rows: reviews } = await db.query(`
            SELECT r.*, u.username
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.product_id = $1
            ORDER BY r.created_at DESC;
        `, [id]);

        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST /products/:id/reviews - Create a review for a product
router.post("/:id/reviews", requireUser, async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;

        // Check if product exists
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Validate rating
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        // Create the review
        const { rows: [review] } = await db.query(`
            INSERT INTO reviews (user_id, product_id, rating, comment)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [userId, id, rating, comment]);

        res.status(201).json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
