import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory reviews storage (reset on server restart)
// For a production site with persistence, a database like SQLite or MongoDB would be used.
// For now, we'll use a simple JSON file to persist reviews on Render (if disk is available) or memory.
let reviews: any[] = [];
const REVIEWS_FILE = path.resolve(__dirname, "reviews.json");

// Load reviews from file if exists
if (fs.existsSync(REVIEWS_FILE)) {
  try {
    const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
    reviews = JSON.parse(data);
  } catch (e) {
    console.error("Failed to load reviews:", e);
    reviews = [];
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const server = createServer(app);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // --- Reviews API ---
  
  // Get all reviews
  app.get("/api/reviews", (_req, res) => {
    res.json(reviews);
  });

  // Add a new review
  app.post("/api/reviews", (req, res) => {
    const newReview = {
      id: Date.now().toString(),
      ...req.body,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    reviews.unshift(newReview);
    
    // Save to file for persistence (Note: Render's free tier disk is ephemeral, but this helps during active sessions)
    try {
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
    } catch (e) {
      console.error("Failed to save review to file:", e);
    }
    
    res.status(201).json(newReview);
  });

  // Delete a review (Admin only password check)
  app.delete("/api/reviews/:id", (req, res) => {
    const { password } = req.body;
    const { id } = req.params;

    if (password !== "giranteam123") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    reviews = reviews.filter(r => r.id !== id);
    
    try {
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
    } catch (e) {
      console.error("Failed to save reviews after deletion:", e);
    }
    
    res.json({ message: "Deleted successfully" });
  });

  // Handle client-side routing
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Frontend build not found.");
      }
    });
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer().catch(console.error);
