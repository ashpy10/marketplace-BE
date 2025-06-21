import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createUser, getUserById, getUserByUsername} from "../db/queries/users.js";
import { requireUser } from "../app.js";


const router = express.Router();
SALT_ROUNDS = 10;

//users/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).send({ error: "Username and password required" });

  const existing = await getUserByUsername(username);
  if (existing) return res.status(400).send({ error: "Username already taken" });

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await createUser({ username, password: hashed });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
  res.send({ token });
});

//users/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).send({ error: "Username and password required" });

  const user = await getUserByUsername(username);
  if (!user) return res.status(401).send({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
  res.send({ token });
});

// GET for account page?**
router.get("/account", requireUser, async (req, res) => {
  const user = await getUserById(req.user.id);
  res.send(user);
});

export default router;
