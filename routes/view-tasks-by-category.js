const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const query = 'SELECT * FROM todos WHERE category_id = $1;';
    const { rows } = await db.query(query, [categoryId]);
    res.json({ tasks: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
