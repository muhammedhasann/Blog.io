const User = require('../../models/User');

module.exports = {
  async profile(req, res) {
    res.render('profile', { user: req.user });
  },

  async editProfilePage(req, res) {
    res.render('edit-profile', { user: req.user });
  },

  async editProfile(req, res) {
    try {
      const { name, email } = req.body;
      const user = await User.findById(req.user._id);
      user.name = name;
      user.email = email;
      await user.save();
      res.redirect('/user/profile');
    } catch (error) {
      res.status(500).render('edit-profile', { user: req.user, error: 'An error occurred while updating the profile.' });
    }
  },

  // Include password change logic
  // ...

  async dashboard(req, res) {
    res.render('dashboard');
  },
};
