
import app from "./app.js";
import db from "./db/client.js";
import { seed } from "./db/seed.js";


const PORT = process.env.PORT || 3000;

// Connect to database and start server
async function startServer() {
  try {
    // Connect to database
    await db.connect();
    console.log('Connected to database');
    
    // Seed the database
    await seed();
    console.log('Database seeded successfully');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();


