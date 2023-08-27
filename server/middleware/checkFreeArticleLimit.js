// middlewares/checkFreeArticleLimit.js
const User = require('../models/User');

const checkFreeArticleLimit = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('subscription');
    if (user.subscription.name === 'Free') {
      if (user.readFreeArticles >= user.subscription.maxFreeReads) {
        return res.status(403).json({ error: 'Upgrade your subscription to read more articles.' });
      }
      user.readFreeArticles += 1;
      await user.save();
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
};

module.exports = checkFreeArticleLimit;
