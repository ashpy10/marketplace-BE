import db from "./db/client.js";
import dotenv from "dotenv";

dotenv.config();

// CDN key is added to .env file - Ask Ashley for the key to insert locally
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'daw3nco1o';

// Base URL for Cloudinary images - version number removed to always use latest version
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;

// Need to do: Seed function to populate the database
async function seed() {

}

const sauces = [
  {
    title: "Ghosted Again",
    description: "The kind of heat that lingers longer than your last situationship. Ghost pepper fueled regret, bottled for your convenience. Pairs well with wings, tacos, and questionable life choices.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}ghosted-again.png`
  },
  {
    title: "Mildly Inappropriate",
    description: "Fresh. Zesty. Slightly offensive. This is your summer fling of hot sauces — short, intense, and surprisingly refreshing with its jalapeño-lime balance.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}mildly-inappropriate.png`
  },
  {
    title: "Pain & Citrus",
    description: "Sweet meets savage. The citrusy orange hits first, then the habanero burns a path straight to your soul. Best with grilled shrimp, tacos, and nervous first dates.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}pain-and-citrus.png`
  },
  {
    title: "The Reaper's Kiss",
    description: "One taste feels like a light peck from Death itself. Carolina reaper levels of 'are you sure about this?' Intensity not recommended for amateurs or optimists.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}reapers-kiss.png`
  },
  {
    title: "Hipster Tears",
    description: "Smoked, smooth, and ironically spicy. The chipotle and sriracha blend perfectly for that 'I only eat local' vibe. Great for avocado toast, ramen, and emotionally unavailable brunch partners.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}hipster-tears.png`
  },
  {
    title: "Flannel Inferno",
    description: "Like chopping wood shirtless in the fall — sweet maple upfront, with a cayenne burn that sneaks in after. Ideal on pancakes, bacon, or literally any brunch plate you Instagram.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}flannel-inferno.png`
  },
  {
    title: "Burnout Culture",
    description: "Extreme heat for the overachiever who refuses to slow down. Scorpion pepper delivers a sharp bite while garlic adds depth. Try it if you're ready to question your choices.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}burnout-culture.png`
  },
  {
    title: "Artisan Regret",
    description: "Balanced acidity with a swift kick. Apple cider vinegar cuts through the richness, but the red habanero ensures you won't forget who's boss. Pairs well with roasted pork and existential dread.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}artisan-regret.png`
  },
  {
    title: "Sweat Equity",
    description: "For the entrepreneur in all of us: sweet heat with a ginger twist that builds intensity like your student debt. Surprisingly good on stir fry, dumplings, and side hustles.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}sweat-equity.png`
  },
  {
    title: "Tattooed Tongue",
    description: "Bright. Bold. Slightly controversial. Serrano heat with cilantro-lime freshness. The perfect companion for tacos, margaritas, or bad tattoo decisions you pretend you don't regret.",
    price: 29.99,
    image_url: `${CLOUDINARY_BASE_URL}tattooed-tongue.png`
  }
];

// Run the seed function
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");


