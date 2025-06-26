import db from "../client.js"

//GET ALL ORDERS FOR A USER
export async function getOrders(userId) {
    const { rows } = await db.query(
        `SELECT * FROM orders WHERE user_id = $1 ORDER BY date DESC`,
        [userId]
    );
    return rows;
}

//ADD A NEW ORDER
export async function addOrder(userId, product_id, date, note) {
    const { rows } = await db.query(
        `INSERT INTO orders (user_id, product_id, date, note)
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
        [userId, product_id, date, note]
    );
    return rows[0];
}

//GET A SPECIFIC ORDER BY USER_ID
export async function getOrderById(userId) {
    const { rows } = await db.query(
        `SELECT * FROM orders WHERE user_id = $1`,
        [userId]
    );
    return rows[0];
}
