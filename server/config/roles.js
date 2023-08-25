const connectRoles = require('connect-roles');

const userRoles = new connectRoles({
  failureHandler: (req, res, action) => {
    res.status(403).render('error', { error: 'Access denied' });
  },
});

userRoles.use('admin', (req) => req.user && req.user.role === 'admin');
userRoles.use('author', (req) => req.user && req.user.role === 'author');

module.exports = userRoles;
