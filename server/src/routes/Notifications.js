const express = require('express');
const router = express.Router();
const Notification = require('../models/Notifications'); // Assuming you have a Notification model

// Get all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new notification
router.post('/', async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;