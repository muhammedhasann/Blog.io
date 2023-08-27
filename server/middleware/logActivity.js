// middlewares/logActivity.js
const logger = require('../logger'); // Path to your Winston logger instance

const logActivity = (action) => {
  return (req, res, next) => {
    const userId = req.user ? req.user.id : 'unknown';
    const message = `User ${userId} performed action: ${action}`;
    logger.info(message);
    next();
  };
};

module.exports = logActivity;
