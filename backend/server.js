const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// **Ensure imported routes are being used correctly**
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Project Management Tool API is Running...");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));


// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
