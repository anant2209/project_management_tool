const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

// Create Project
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const newProject = new Project({ name, description, status, createdBy: req.user.id });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Error creating project" });
    }
});

// Get Projects
router.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user.id });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching projects" });
    }
});

module.exports = router; // ✅ Ensure it's exported correctly
