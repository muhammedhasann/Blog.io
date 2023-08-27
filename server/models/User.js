const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
  readFreeArticles: { type: Number, default: 0 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
