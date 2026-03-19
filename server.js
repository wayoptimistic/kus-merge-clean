import express from "express";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
console.log("ACCOUNT ID:", process.env.R2_ACCOUNT_ID);

const app = express();
const s3 = new S3Client({
  region: "auto",
  endpoint: "https://8751adfdd513061b3b6c5629089775d0.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
  forcePathStyle: true
});
// ==============================
// ROOT (health check)
// ==============================
app.get("/", (req, res) => {
  res.send("KUS Merge Server Running");
});

// ==============================
// LIST (test endpoint)
// ==============================
app.get("/list", async (req, res) => {
  try {
    const data = await s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET,
      })
    );

    const files = (data.Contents || []).map(obj => ({
      name: obj.Key,
    }));

    res.json(files);
  } catch (err) {
    console.error("R2 ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==============================
// VIDEO TEST (placeholder)
// ==============================
app.get("/video/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Video request received for: ${name}`);
});

// ==============================
// MERGE TEST (placeholder)
// ==============================
app.get("/merge", (req, res) => {
  res.send("Merge endpoint coming next");
});

// ==============================
// START SERVER (CRITICAL)
// ==============================
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("KUS server running on port " + PORT);
});

