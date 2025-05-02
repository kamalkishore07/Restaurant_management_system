const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, signUp, login } = require('../controllers/UserController'); // Import the controller functions

// Get all users
router.get('/', getAllUsers);

// Add a new user
router.post('/', addUser);

// User sign-up
router.post('/signup', signUp);

// User login
router.post('/login', login);

module.exports = router;