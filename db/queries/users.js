import db from "../client.js"

//CREATE A USER//
export async function createUser({username, password}){
    const sql = `
    INSERT INTO users(username, password)
    VALUES($1, $2)
    RETURNING *;
    `;

    const {rows: user} = await db.query(sql,[username, password]);
    return user

}
//GET USER BY ID//
export async function getUserById(id){
    const sql = `
    SELECT *
    FROM users
    WHERE id = $1;
    `;
    const {rows: user} = await db.query(sql, [id]);
    return user[0];

}

//GET USER BY USERNAME **for log in??**
export async function getUserByUsername(username) {
  const { rows } = await client.query(
    `SELECT * FROM users WHERE username = $1;`,
    [username]
  );
  return rows[0];
}