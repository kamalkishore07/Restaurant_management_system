const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, signUp, login, forgotPassword, resetPassword, verifyOtp } = require('../controllers/UserController');

// Get all users
router.get('/', getAllUsers);

// Add a new user
router.post('/', addUser);

// User sign-up
router.post('/signup', signUp);

// User login
router.post('/login', login);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password', resetPassword);

router.post('/signup', signUp);

// Verify OTP
router.post('/verify-otp', (req, res, next) => {
    console.log('Verify OTP route hit');
    next();
}, verifyOtp);

module.exports = router;