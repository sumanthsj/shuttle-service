// backend/routes/bookingRoutes.js
const express = require('express');
const Booking = require('../models/bookingModel');
const router = express.Router();

router.post('/book', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, route } = req.body;

    // Create a new booking document
    const newBooking = new Booking({ name, email, route });

    // Save the booking to the database
    await newBooking.save();

    // Respond with success message
    res.json({ message: 'Booking successful and saved to the database!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save booking.' });
  }
});

module.exports = router;
