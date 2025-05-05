const express = require('express');
const router = express.Router();

const inventoryRoutes = require('./Inventory');
const menuItemRoutes = require('./Menu_item');
const notificationRoutes = require('./Notifications');
const orderItemRoutes = require('./Order_items');
const orderRoutes = require('./Order');
const salesReportRoutes = require('./Sales_report');
const userRoutes = require('./User');

// Use the routes
router.use('/inventory', inventoryRoutes);
router.use('/menuitems', menuItemRoutes);
router.use('/notifications', notificationRoutes);
router.use('/orderitems', orderItemRoutes);
router.use('/orders', orderRoutes);
router.use('/salesreports', salesReportRoutes);
router.use('/users', userRoutes);

module.exports = router;