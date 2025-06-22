import db from "./client.js";
import { products } from "./data.js";
import { createUser } from "./queries/users.js";
import { createProduct } from "./queries/products.js";
import { addOrder } from "./queries/orders.js";
import { createReview } from "./queries/reviews.js";

await db.connect();
await seed();
console.log("🌱 Database seeded.");
await db.end();

// Seed function to populate the database
async function seed() {

  //Seeding a user
  const firstUser = await createUser({username: "mark", password: "password123"});
   

  // Seeding ALL products
  
  await Promise.all(
    products.map(product => createProduct(product))
  );

  // Seeding an order

  await addOrder(new Date(), firstUser.id)


  // Seeding a review
  await createReview ({rating: 5, comment: "Spicy!", product_id: 1, user_id: firstUser.id})



}




