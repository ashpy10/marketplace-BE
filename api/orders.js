import express from "express";
import { requireUser } from "../app.js";
import { addOrder, getOrderById, getOrders } from "../db/queries/orders.js";

const router = express.Router();

//Authentication for all routes
router.use(requireUser);

//GET /orders
router.get("/", async (req, res) => {
    try {
        const orders = await getOrders(req.user.id);
        res.send(orders);
    } catch (err) {
        res.status(500).send({ error: "Failed to get orders" });
    }
});

//POST /orders
router.post("/", async (req, res) => {
  const { date, product_id, note } = req.body;

  if (!date || typeof date !== "string") {
    return res.status(400).send("Please provide a valid date");
  }
  if (!product_id) {
    return res.status(400).send("Missing product_id");
  }

  try {
    const newOrder = await addOrder(req.user.id, product_id, date, note || "");
    res.status(201).send(newOrder);
  } catch (err) {
    console.error("Error in POST /orders:", {
      message: err.message,
      stack: err.stack,
      user_id: req.user?.id,
      product_id,
      date,
      note,
    });
    res.status(500).send({ error: "Failed to add order" });
  }
});

//GET /orders/:id
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try { 
        const order = await getOrderById(id)

        if (!order) {
            return res.status(404).send("Order not found")
        }
    
        if (order.userId !== req.user.id) {
            return res.status(403).send("Forbidden")
        }
        
        res.send(order)
    } catch (err) {
        res.status(500).send({ error: "Failed to fetch order"});
    }
});

export default router

