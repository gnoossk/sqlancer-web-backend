const express = require("express");
const router = express.Router();
const os = require("os");

// Get system status (DB health, uptime)
router.get("/status", async (req, res) => {
    try {
        res.json({
            success: true,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            cpuLoad: os.loadavg(),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get backend logs (dummy example)
router.get("/logs", async (req, res) => {
    try {
        res.json({ success: true, logs: ["Log 1", "Log 2", "Log 3"] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
