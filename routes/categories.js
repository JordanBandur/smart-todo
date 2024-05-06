const express = require('express');
const router = express.Router();
const db = require('../db/database'); // Again, using your database functions

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await db.getCategories(); // Assume getCategories is defined in your database module
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve categories.' });
  }
});

module.exports = router;
