const express = require('express');
const router = express.Router();
const OrderItem = require('../models/Order_items'); // Assuming you have an OrderItem model

// Get all order items
router.get('/', async (req, res) => {
    try {
        const orderItems = await OrderItem.find();
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new order item
router.post('/', async (req, res) => {
    try {
        const newOrderItem = new OrderItem(req.body);
        const savedOrderItem = await newOrderItem.save();
        res.status(201).json(savedOrderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;