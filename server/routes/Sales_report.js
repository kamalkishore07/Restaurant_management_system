const express = require('express');
const router = express.Router();
const SalesReport = require('../models/Sales_report'); // Assuming you have a SalesReport model

// Get all sales reports
router.get('/', async (req, res) => {
    try {
        const reports = await SalesReport.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new sales report
router.post('/', async (req, res) => {
    try {
        const newReport = new SalesReport(req.body);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;