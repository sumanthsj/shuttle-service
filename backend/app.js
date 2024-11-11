// backend/app.js
const dotenv = require('dotenv');
dotenv.config();
console.log("MONGO_URL:", process.env.MONGO_URL);

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Booking = require('./models/bookingModel');

const app = express();
app.use(express.json());

const PORT = 4000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Database connection error:', error));

// Dummy booking endpoint
app.post('/api/book', async (req, res) => {
  const { name, email, route } = req.body;

  try {
    // Validate input
    if (!name || !email || !route) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create or find existing user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email });
      await user.save();
    }

    // Create dummy booking
    const fare = route === 'Rolla to Airport' ? 120 : 100; // Example fare for a route
    const booking = new Booking({
      userId: user._id,
      route,
      fare,
      status: 'Confirmed',
    });

    // Simulate payment processing (just for testing purposes)
    const paymentSuccess = true; // Mocking a successful payment
    if (!paymentSuccess) {
      return res.status(500).json({ message: 'Payment failed' });
    }

    await booking.save(); // Save booking to DB

    res.status(200).json({
      message: 'Booking successful',
      bookingDetails: {
        route,
        fare,
        status: booking.status,
        user: { name: user.name, email: user.email },
      },
    });
  } catch (error) {
    console.error('Error during booking:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
