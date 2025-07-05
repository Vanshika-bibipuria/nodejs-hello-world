const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected to Atlas"))
  .catch((err) => console.error("❌ Connection failed:", err));

// ✅ Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

// ✅ Routes

// Create
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Read all
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Update
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(deletedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// ✅ Server Start
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
