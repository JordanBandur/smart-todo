const express = require('express');
const router = express.Router();
const db = require('../db/database'); // Import your database helper functions

// get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db.getTasks(); // Assume getTasks is a function you'll define in your database module
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks.' });
  }
});

// add a new task
router.post('/', async (req, res) => {
  try {
      const { title, categoryId, userId } = req.body;
      const newTask = await db.addTask(title, categoryId, userId);
      res.status(201).json(newTask);
  } catch (err) {
      console.error(err); // Log the error to the console for debugging
      res.status(500).json({ error: 'Failed to add task.' });
  }
});


// update a task
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, category_id, user_id } = req.body;

  try {
      const sql = `UPDATE todos SET title = $1, category_id = $2, user_id = $3, updated_at = NOW() WHERE id = $4 RETURNING *;`;
      const { rows } = await db.query(sql, [title, category_id, user_id, id]);
      if (rows.length === 0) {
          return res.status(404).json({ error: 'Task not found.' });
      }
      res.json(rows[0]);
  } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Error updating task.' });
  }
});



// delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const { taskId } = req.params;
    const deleted = await db.deleteTask(taskId);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Task not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task.' });
  }
});


module.exports = router;
