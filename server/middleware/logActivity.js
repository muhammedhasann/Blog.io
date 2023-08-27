const logger = require('../utils/logger.js');

const logActivity = (action) => {
  return (req, res, next) => {
    const userId = req.user ? req.user.id : 'unknown';
    const message = `User ${userId} performed action: ${action}`;
    logger.info(message);
    next();
  };
};

module.exports = logActivity;
