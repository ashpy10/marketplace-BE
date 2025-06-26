import express from "express";
import { createReview, getAllReviews, getReviewsByProductId } from "../db/queries/reviews.js";

console.log("✅ Loaded reviewsRouter");

const router = express.Router();

// 🔧 Test route to confirm router is mounted
router.get("/test", (req, res) => {
  console.log("✅ /api/reviews/test route hit");
  res.send("✅ Reviews router is mounted and working");
});

// GET /api/reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    console.log("✅ All reviews fetched:", reviews.length);
    res.send(reviews);
  } catch (err) {
    console.error("💥 ERROR in GET /reviews:", err.message);
    console.error(err.stack);
    res.status(500).send({ error: "Internal server error" });
  }
});

// GET /api/reviews/products/:id
router.get("/products/:id", async (req, res, next) => {
  console.log("📥 Incoming request to /reviews/products/:id");
  console.log("req.params:", req.params);

  const { id } = req.params;

  try {
    const reviews = await getReviewsByProductId(id);
    console.log("✅ Reviews fetched:", reviews.length);
    res.send(reviews);
  } catch (err) {
    console.error("💥 ERROR in GET /reviews/products/:id:", err.message);
    console.error(err.stack);
    res.status(500).send({ error: "Internal server error" });
  }
});

// POST /api/reviews/products/:id
router.post("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).send({ error: "Rating must be between 1 and 5" });
    }

    const newReview = await createReview({
      rating,
      comment,
      product_id: id
    });

    console.log("✅ Review added:", newReview);
    res.status(201).send(newReview);
  } catch (err) {
    console.error("💥 ERROR in POST /reviews/products/:id:", err.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
