// backend/models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  route: String,
  status: { type: String, default: 'successful' } // Dummy status
});

module.exports = mongoose.model('Booking', bookingSchema);
