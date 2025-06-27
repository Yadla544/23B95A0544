const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
  const logPath = path.join(__dirname, '../log.txt');

  try {
    fs.appendFileSync(logPath, log);
  } catch (err) {
    console.error("Failed to write log:", err);
  }

  next();
};
