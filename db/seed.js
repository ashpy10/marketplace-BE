import db from "./client.js";
import { products } from "./data.js";
import { createUser } from "./queries/users.js";
import { createProduct } from "./queries/products.js";
import { addOrder } from "./queries/orders.js";
import { createReview } from "./queries/reviews.js";
import bcrypt from "bcrypt";


await db.connect();
await seed();
console.log("🌱 Database seeded.");
await db.end();

// Seed function to populate the database
async function seed() {
  const plainPassword = "password123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  //Seeding a user
  const firstUser = await createUser({
    username: "mark",
    password: hashedPassword,
  });

  // Seeding ALL products
  await Promise.all(products.map((product) => createProduct(product)));

  // Seeding an order
  const note = "First ever order";
  await addOrder(firstUser.id, 2, new Date(), note);

  // Seeding a review
  await createReview({
    rating: 5,
    comment: "Spicy!",
    product_id: 1,
  });

  // Seeding more reviews
  await createReview({
    rating: 4,
    comment: "Great flavor, not too hot!",
    product_id: 1,
  });
  await createReview({
    rating: 5,
    comment: "Absolutely love this sauce!",
    product_id: 2,
  });
  await createReview({
    rating: 3,
    comment: "Good but could be spicier",
    product_id: 2,
  });
  await createReview({
    rating: 5,
    comment: "Perfect balance of heat and flavor",
    product_id: 3,
  });
  await createReview({
    rating: 4,
    comment: "Really tasty, great on tacos",
    product_id: 4,
  });
  await createReview({
    rating: 5,
    comment: "This is my new favorite!",
    product_id: 5,
  });
  await createReview({
    rating: 4,
    comment: "Excellent quality sauce",
    product_id: 6,
  });
  await createReview({
    rating: 3,
    comment: "Decent heat level",
    product_id: 7,
  });
  await createReview({
    rating: 5,
    comment: "Amazing flavor profile",
    product_id: 8,
  });
  await createReview({
    rating: 4,
    comment: "Great for cooking",
    product_id: 9,
  });
  await createReview({
    rating: 5,
    comment: "Highly recommend!",
    product_id: 10,
  });
}
