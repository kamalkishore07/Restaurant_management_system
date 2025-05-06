const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/MenuItemController');

// Get all menu items
router.get('/', getMenuItems);

// Add a new menu item
router.post('/', addMenuItem);

// Update a menu item
router.put('/:id', updateMenuItem);

// Delete a menu item
router.delete('/:id', deleteMenuItem);

module.exports = router;