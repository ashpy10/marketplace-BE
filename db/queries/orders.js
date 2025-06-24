import db from "../client.js"

//GET ALL ORDERS FOR A USER
export async function getOrders(id) {
    const { rows } = await db.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY date DESC`,
        [id]
    );
    return rows;
}

//ADD A NEW ORDER
export async function addOrder(user_id, date) {
    const { rows } = await db.query(
        `INSERT INTO orders (date, user_id) VALUES ($1, $2) RETURNING *`,
        [date, user_id]
    );
    return rows[0];
}

//GET A SPECIFIC ORDER BY ID
export async function getOrderById(orderId) {
    const { rows } = await db.query(
        `SELECT * FROM orders WHERE id = $1`,
        [orderId]
    );
    return rows[0];
}