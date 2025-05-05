const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu_item'); // Assuming you have a MenuItem model

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new menu item
router.post('/', async (req, res) => {
    try {
        const newMenuItem = new MenuItem(req.body);
        const savedMenuItem = await newMenuItem.save();
        res.status(201).json(savedMenuItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;