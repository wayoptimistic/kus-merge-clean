import express from "express";

const app = express();

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
    res.json([
      { name: "kus-1.webm" },
      { name: "kus-2.webm" }
    ]);
  } catch (err) {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
