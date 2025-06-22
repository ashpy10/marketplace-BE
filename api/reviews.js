import express from "express";
import { requireUser } from "../app.js";
import db from "../db/client.js";


const router = express.Router();

// GET /api/products/:id/reviews
router.get("/products/:id/reviews", requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      `SELECT * FROM reviews WHERE product_id = $1 ORDER BY id DESC`,
      [id]
    );
    res.send(rows);
  } catch (err) {
    next(err);
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

    const { rows: [newReview] } = await db.query(
      `INSERT INTO reviews (rating, comment, product_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [rating, comment, id]
    );

    res.status(201).send(newReview);
  } catch (err) {
    next(err);
  }
});

export default router;
