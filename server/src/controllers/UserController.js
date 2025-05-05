const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens
const crypto = require('crypto'); // For generating reset tokens
const nodemailer = require('nodemailer'); // Import Nodemailer
const jwt_secret = 'ce97977a29ae48677a656282a2de269eb47211771dae2a5a6de03225fa2b65480e1fc71440216527e8e4116f6c8f59867a640404673ac17bf6fe730f66b2da720cf0809a626af74ca5974f3364f89db7959d125c46c45b1ff1c4947225f0adc13bfa80cf3c07b1ddc9a5d4b1f700853443b5f08b7a11a21468bf11217b2cfe125cc16b1ccd3230b33fa1980d1447097ef884144f02bf93b4b15e9dbd84b702143684626a76bae7587046e532afd57f1fe408bbb2342b94799f68911dfcbc613c116a926261e56f95fe1b82d2dbd4f868445caa7a3424a0350eaf107ebc194fd36e43e8c8793aebec65c8b924e52991cc7d2d2bcb48148404cae33c9ae7853c8e'
// Controller to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to add a new user
const addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Temporary in-memory storage for user details and OTPs
const tempUsers = {};

// Controller for user sign-up with OTP
const signUp = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate an OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Temporarily store user details and OTP
        tempUsers[email] = {
            username,
            email,
            password: hashedPassword,
            phone,
            otp,
            otpExpires,
        };

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jjebinjose07@gmail.com', // Replace with your email
                pass: 'xprpxwlkzyoybddf', // Replace with your email password
            },
        });

        const mailOptions = {
            from: 'jjebinjose07@gmail.com',
            to: email,
            subject: 'Verify Your Email',
            text: `Your OTP for email verification is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to your email. Please verify your email to complete the registration.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, jwt_secret, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = await bcrypt.hash(resetToken, 10);

        // Save the hashed token and expiration time to the user
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        // Send the reset token to the user (e.g., via email)
        // For simplicity, we'll return it in the response
        res.status(200).json({ message: 'Password reset token generated', resetToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller for reset password
const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        // Find the user with the matching reset token
        const user = await User.findOne({
            resetPasswordToken: { $exists: true },
            resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Verify the reset token
        const isTokenValid = await bcrypt.compare(resetToken, user.resetPasswordToken);
        if (!isTokenValid) {
            return res.status(400).json({ message: 'Invalid reset token' });
        }

        // Hash the new password and save it
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Clear the reset token and expiration
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const verifyOtp = async (req, res) => {
    console.log('Verify OTP route hit'); // Log to confirm the route is hit
    try {
        const { email, otp } = req.body;
        console.log('Request Body:', req.body); // Log the request body

        // Check if the user exists in temporary storage
        const tempUser = tempUsers[email];
        if (!tempUser) {
            return res.status(404).json({ message: 'No registration request found for this email.' });
        }

        // Check if the OTP is valid
        if (tempUser.otp !== otp || tempUser.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Save the user to the database
        const newUser = new User({
            username: tempUser.username,
            email: tempUser.email,
            password: tempUser.password,
            phone: tempUser.phone,
        });
        await newUser.save();

        // Remove the user from temporary storage
        delete tempUsers[email];

        res.status(200).json({ message: 'Email verified successfully. User registered.' });
    } catch (error) {
        console.error('Error in verifyOtp:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


module.exports = {
    getAllUsers,
    addUser,
    signUp,
    login,
    forgotPassword,
    resetPassword,
    verifyOtp
};