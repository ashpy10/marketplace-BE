import express from "express";
import { requireUser } from "../app.js";
import db from "../db/client.js";

console.log("✅ Loaded reviewsRouter");

const router = express.Router();

// 🔧 Test route to confirm router is mounted
router.get("/test", (req, res) => {
  console.log("✅ /api/test route hit");
  res.send("✅ Reviews router is mounted and working");
});

// GET /api/products/:id/reviews
router.get("/products/:id/reviews", async (req, res, next) => {
  console.log("📥 Incoming request to /products/:id/reviews");
  console.log("req.params:", req.params);

  const { id } = req.params;

  try {
    const { rows } = await db.query(
      `SELECT * FROM reviews WHERE product_id = $1 ORDER BY id DESC`,
      [id]
    );
    console.log("✅ Reviews fetched:", rows.length);
    res.send(rows);
  } catch (err) {
    console.error("💥 ERROR in GET /products/:id/reviews:", err.message);
    console.error(err.stack);
    res.status(500).send({ error: "Internal server error" });
  }
});

// POST /api/products/:id/reviews
router.post("/products/:id/reviews", requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).send({ error: "Rating must be between 1 and 5" });
    }

    const {
      rows: [newReview],
    } = await db.query(
      `INSERT INTO reviews (rating, comment, product_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [rating, comment, id]
    );

    console.log("✅ Review added:", newReview);
    res.status(201).send(newReview);
  } catch (err) {
    console.error("💥 ERROR in POST /products/:id/reviews:", err.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
