const express = require("express");
const { runSQLancer } = require("../controllers/sqlancerController");

const router = express.Router();

router.post("/run", runSQLancer);

module.exports = router;
