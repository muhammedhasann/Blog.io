const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  maxFreeReads: { type: Number, default: 5 },
});

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
