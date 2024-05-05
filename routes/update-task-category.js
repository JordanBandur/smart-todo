const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.put('/:id/category', async (req, res) => {
  const { id } = req.params;
  const { category_id } = req.body;
  try {
    const query = 'UPDATE todos SET category_id = $1 WHERE id = $2 RETURNING *;';
    const { rows } = await db.query(query, [category_id, id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
