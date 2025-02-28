const express = require("express");
const router = express.Router();
const { prisma } = require("../prismaClient");

// Get all SQLancer runs
router.get("/runs", async (req, res) => {
    try {
        const runs = await prisma.sqlancerRun.findMany();
        res.json({ success: true, data: runs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start a new SQLancer execution
router.post("/run", async (req, res) => {
    const { name, database } = req.body;
    if (!name || !database) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const newRun = await prisma.sqlancerRun.create({
            data: { name, database, status: "Running", startTime: new Date() },
        });
        res.json({ success: true, data: newRun });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get details of a specific SQLancer run
router.get("/run/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const run = await prisma.sqlancerRun.findUnique({ where: { id: parseInt(id) } });
        if (!run) return res.status(404).json({ success: false, message: "Run not found" });

        res.json({ success: true, data: run });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Stop a SQLancer execution
router.delete("/run/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.sqlancerRun.delete({ where: { id: parseInt(id) } });
        res.json({ success: true, message: "Run stopped successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
