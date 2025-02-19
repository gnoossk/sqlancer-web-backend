const { exec } = require("child_process");
const path = require("path");

exports.runSQLancer = async (req, res) => {
  try {
    const { database } = req.body; // Example: "sqlite"
    const sqlancerPath = path.join(__dirname, "../../sqlancer/build/libs/sqlancer.jar");

    exec(`java -jar ${sqlancerPath} ${database}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing SQLancer: ${error.message}`);
        return res.status(500).json({ error: "SQLancer execution failed" });
      }

      if (stderr) {
        console.error(`SQLancer error: ${stderr}`);
        return res.status(500).json({ error: stderr });
      }

      res.json({ output: stdout });
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
