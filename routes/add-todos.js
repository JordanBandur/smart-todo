// routes/add-todos.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const categorizeTask = require('../helpers/categorizeTask');
const { addToDo } = require('../helpers/database');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// hardcoded default user ID for testing
const defaultUserId = 1;

router.post('/', async (req, res) => {
  try {
    const taskDescription = req.body['new-todo'];
    console.log(taskDescription);

    // Call the categorizeTask function to categorize the task
    let category = await categorizeTask(taskDescription);

    // Default to "Movies/Series" category if the category is missing or unexpected
    if (!category || category === null || category === undefined) {
      category = "Film/Series";
    }

    // Determine the list ID based on the category
    let listId;
    switch (category) {
      case "Film/Series":
        listId = "movieList";
        break;
      case "Books":
        listId = "bookList";
        break;
      case "Restaurants":
        listId = "restaurantList";
        break;
      case "Products":
        listId = "productList";
        break;
      default:
        listId = null;
        break;
    }

    // Add the task to the database
    const newTask = await addToDo({ title: taskDescription, user_id: defaultUserId, category });

    // Send JSON response with category and list ID
    res.json({ category, listId, newTask });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


