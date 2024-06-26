// routes/add-todos.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const categorizeTask = require('../helpers/categorizeTask');
const { addToDo } = require('../helpers/database');
const db = require('../db/connection');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Gets the user's todos from the DB and displays the html in todos.ejs

router.get('/', async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const todosResult = await db.query(`
    SELECT todos.id, todos.title, todos.completed, categories.name AS category_name
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    ORDER BY categories.name, todos.created_at DESC;
    `);

    const todos = todosResult.rows;

    const categorizedTodos = todos.reduce((acc, todo) => {
      if (!acc[todo.category_name]) {
        acc[todo.category_name] = [];
      }
      acc[todo.category_name].push({ id: todo.id, title: todo.title, completed: todo.completed });
      return acc;
    }, {});

    res.json({ categorizedTodos }); // Send this data as JSON
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const taskDescription = req.body['new-todo'];

    // Call the categorizeTask function to categorize the task
    let category = await categorizeTask(taskDescription);
    let categoryName = category.name;

    // Determine the list ID based on the category
    const listIds = {
      'Film/Series': 'movieList',
      'Books': 'bookList',
      'Restaurants': 'restaurantList',
      'Products': 'productList'
    };

    let listId = listIds[categoryName] || null;

    // Add the task to the database
    const newTask = await addToDo({ title: taskDescription, user_id: req.session.user.id, categoryName });

    // Send JSON response with category and list ID
    res.json({ category, listId, newTask });
  } catch (error) {
    console.error('Error adding task:', error);
  }
});

module.exports = router;


