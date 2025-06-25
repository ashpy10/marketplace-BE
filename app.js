import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usersRouter from "./api/users.js";
import productsRouter from "./api/products.js";
import reviewsRouter from "./api/reviews.js";
console.log("📦 reviewsRouter imported:", typeof reviewsRouter);
import ordersRouter from "./api/orders.js";

console.log("✅ Loaded app.js");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/direct-test", (req, res) => {
  console.log("✅ Direct route in app.js hit");
  res.send("✅ This worked directly from app.js");
});

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api", reviewsRouter);
app.use("/api/orders", ordersRouter);

export function requireUser(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).send({ error: "Token required" });

  const token = auth.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export default app;
