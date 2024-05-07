// routes/add-todos.js
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const categorizeTask = require('../helpers/categorizeTask');
const { addToDo } = require('../helpers/database');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// hardcoded default user ID for testing


router.post('/', async (req, res) => {
  try {
    const taskDescription = req.body['new-todo'];


    // Call the categorizeTask function to categorize the task
    let category = await categorizeTask(taskDescription);
    console.log(category);
    let categoryName = category.name;
    console.log("category from add-todos.js: " + categoryName);

    // Default to "Movies/Series" category if the category is missing or unexpected
    // const validCategories = ['Film/Series', 'Books', 'Restaurants', 'Products'];
    // if (!validCategories.includes(category)) {
    //   category = 'Film/Series';
    // }

    console.log('final category: ' + categoryName);

    // Determine the list ID based on the category
    const listIds = {
      'Film/Series': 'movieList',
      'Books': 'bookList',
      'Restaurants': 'restaurantList',
      'Products': 'productList'
    };

    let listId = listIds[categoryName] || null;


    //testing this

    // Add the task to the database
    const newTask = await addToDo({ title: taskDescription, user_id: req.session.user.id, categoryName });


    // Send JSON response with category and list ID
    res.json({ category, listId, newTask });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


