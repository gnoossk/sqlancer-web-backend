const express = require("express");
const router = express.Router();
const { prisma } = require("../prismaClient");

// Get all bug reports
router.get("/bugs", async (req, res) => {
    try {
        const bugs = await prisma.bugReport.findMany();
        res.json({ success: true, data: bugs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Submit a new bug report
router.post("/report-bug", async (req, res) => {
    const { runId, description, severity } = req.body;
    if (!runId || !description || !severity) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const newBug = await prisma.bugReport.create({
            data: { runId, description, severity, timestamp: new Date() },
        });
        res.json({ success: true, data: newBug });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get a specific bug report
router.get("/bug/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const bug = await prisma.bugReport.findUnique({ where: { id: parseInt(id) } });
        if (!bug) return res.status(404).json({ success: false, message: "Bug not found" });

        res.json({ success: true, data: bug });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
