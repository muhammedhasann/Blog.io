const userRoles = require('../config/roles');

module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
  },
  validateUserProfile: [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Invalid email address.'),
  ],

  ensureAuthorized(roles) {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        if (roles.some(role => userRoles.user(req).is(role))) {
          return next();
        }
      }
      res.status(403).json({ error: 'Forbidden' });
    };
  },
};
