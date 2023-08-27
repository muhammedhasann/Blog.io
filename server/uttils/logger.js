// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Set the log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Use JSON format for logs
  ),
  transports: [
    new winston.transports.File({ filename: 'activity.log' }),
  ],
});

module.exports = logger;
