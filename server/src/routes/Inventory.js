const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory'); // Assuming you have an Inventory model

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new inventory item
router.post('/', async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;