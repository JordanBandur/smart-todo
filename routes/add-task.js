const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const categorizeTask = require('../utilities/categorizeTask'); // function in utilities directory which determines task category

router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const category = await categorizeTask(title);
    if (!category.id) {
      return res.status(400).json({ message: 'Unable to categorize task. Please categorize manually.' });
    }
    const query = 'INSERT INTO todos (title, category_id) VALUES ($1, $2) RETURNING *;';
    const { rows } = await db.query(query, [title, category.id]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
