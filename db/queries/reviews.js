import db from "../client.js";

//CREATE A REVIEW//

export async function createReview({ rating, comment, product_id }) {
  const sql = `
    INSERT INTO reviews (rating, comment, product_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [rating, comment, product_id]);
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

//GET REVIEWS BY PRODUCT ID//
export async function getReviewsByProductId(product_id) {
  const sql = `
    SELECT * FROM reviews 
    WHERE product_id = $1 
    ORDER BY id DESC;
  `;
  const { rows } = await db.query(sql, [product_id]);
  return rows;
}

