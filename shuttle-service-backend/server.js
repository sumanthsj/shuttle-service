const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Booking = require('./Models/Booking'); // Import the Booking model

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shuttle-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// POST route to save booking details
app.post('/api/bookings', async (req, res) => {
  const { name, email, route, status } = req.body;

  // Validate request data
  if (!name || !email || !route || !status) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Create a new booking document
    const newBooking = new Booking({
      name,
      email,
      route,
      status,
    });

    // Save the booking to MongoDB
    await newBooking.save();

    // Respond with success
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// GET route to retrieve all the bookings saved in mongoDB
app.use(express.json());
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find(); // Retrieve all bookings
    res.status(200).json(bookings); // Send the bookings as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookings', error });
  }
});