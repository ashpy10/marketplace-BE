import express from "express";
import usersRouter from "./routes/users.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", usersRouter);
