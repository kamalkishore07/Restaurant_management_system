const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev')); // Logging middleware for development
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/restaurant_management'; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Create collections explicitly
    await mongoose.connection.createCollection('menuitems');
    await mongoose.connection.createCollection('orders');
    await mongoose.connection.createCollection('users');

    console.log('Collections created (if not already existing)');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Routes
app.use('/auth', require('./routes/User'));
// Start the server
const PORT = 3000; // Replace with your desired port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});