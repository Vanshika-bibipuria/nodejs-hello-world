const express = require("express");
const multer = require("multer");
const axios = require("axios");

const app = express();
const port = 3000;

// File upload setup using multer
const upload = multer({ dest: "uploads/" });

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Week 8 – Advanced Express.js Project 🚀");
});

// File upload route
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({
    message: "File uploaded successfully!",
    file: req.file,
  });
});

// Joke API route
app.get("/joke", async (req, res) => {
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/jokes/programming/random");
    res.send(response.data[0]);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch joke" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
