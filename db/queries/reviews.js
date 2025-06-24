import db from "../client.js";

//CREATE A REVIEW//

export async function createReview({ rating, comment, product_id, user_id }) {
  const sql = `
    INSERT INTO reviews (rating, comment, product_id, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [rating, comment, product_id, user_id]);
  return rows[0];
}

//GET ALL REVIEWS//

export async function getAllReviews() {
  const sql = `
    SELECT * FROM reviews;
  `;
  const { rows } = await db.query(sql);
  return rows;
}