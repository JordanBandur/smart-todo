const express = require('express');
const router = express.Router();
const db = require('../db/database'); // Import your database helper functions

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db.getTasks(); // Assume getTasks is a function you'll define in your database module
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks.' });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  try {
    const { title, categoryId } = req.body; // Assume tasks are added with a title and categoryId
    const newTask = await db.addTask(title, categoryId); // Assume addTask is a function in your database module
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task.' });
  }
});

// Update a task
router.put('/:taskId', async (req, res) => {
  try {
    const { title, categoryId } = req.body;
    const { taskId } = req.params;
    const updatedTask = await db.updateTask(taskId, title, categoryId);
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task.' });
  }
});

// Delete a task
router.delete('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    await db.deleteTask(taskId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task.' });
  }
});

module.exports = router;
