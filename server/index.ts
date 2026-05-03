import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient, ObjectId } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Atlas 연결
const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = "giranteam";
const COLLECTION_NAME = "reviews";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "giranteam123";

let client: MongoClient;

async function getCollection() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("MongoDB Atlas connected successfully");
  }
  return client.db(DB_NAME).collection(COLLECTION_NAME);
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

  // Health check
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // --- Reviews API ---

  // 전체 후기 조회
  app.get("/api/reviews", async (_req, res) => {
    try {
      const collection = await getCollection();
      const reviews = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      res.json(reviews);
    } catch (e) {
      console.error("Failed to get reviews:", e);
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  });

  // 후기 작성
  app.post("/api/reviews", async (req, res) => {
    try {
      const collection = await getCollection();
      const newReview = {
        ...req.body,
        createdAt: new Date(),
        date: new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      const result = await collection.insertOne(newReview);
      res.status(201).json({ ...newReview, _id: result.insertedId });
    } catch (e) {
      console.error("Failed to save review:", e);
      res.status(500).json({ message: "후기 저장에 실패했습니다." });
    }
  });

  // 후기 삭제 (관리자 비밀번호 확인)
  app.delete("/api/reviews/:id", async (req, res) => {
    const { password } = req.body;
    const { id } = req.params;

    if (password !== ADMIN_PASSWORD) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    try {
      const collection = await getCollection();
      // ObjectId 또는 문자열 id 모두 처리
      let query: any;
      try {
        query = { _id: new ObjectId(id) };
      } catch {
        query = { _id: id };
      }
      const result = await collection.deleteOne(query);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "후기를 찾을 수 없습니다." });
      }
      res.json({ message: "삭제되었습니다." });
    } catch (e) {
      console.error("Failed to delete review:", e);
      res.status(500).json({ message: "삭제에 실패했습니다." });
    }
  });

  // 클라이언트 라우팅 처리
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
