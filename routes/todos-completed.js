// File: todos-completed.js
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// ensure the route matches '/todos-completed/:id'
router.post('/:id', async (req, res) => { // this now handles POST requests to '/todos-completed/:id'
  const taskId = req.params.id;
  const completed = req.body.completed; // assume this is a boolean directly

  try {
    const result = await db.query(
      'UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, taskId]
    );

    if (result.rows.length > 0) {
      res.json({ message: 'Task updated successfully', task: result.rows[0] });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
