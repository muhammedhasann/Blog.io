const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../../models/User');

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).render('register', { error: 'User with this email already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.redirect('/auth/login');
    } catch (error) {
      res.status(500).render('register', { error: 'An error occurred while registering the user.' });
    }
  },

  async login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).render('login', { error: 'Incorrect email or password.' });
      }
      req.logIn(user, err => {
        if (err) {
          return next(err);
        }
        return res.redirect('/user/dashboard');
      });
    })(req, res, next);
  },

  logout(req, res) {
    req.logout();
    res.redirect('/auth/login');
  },
};
