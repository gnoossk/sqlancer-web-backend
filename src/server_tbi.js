const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import API routes
const sqlancerRoutes = require("./routes/sqlancer");
const bugRoutes = require("./routes/bugs");
const systemRoutes = require("./routes/system");

app.use("/sqlancer", sqlancerRoutes);
app.use("/system", systemRoutes);
app.use("/sqlancer", bugRoutes); // Keep all SQLancer-related routes under `/sqlancer`

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
