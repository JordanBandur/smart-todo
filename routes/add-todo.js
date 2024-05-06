const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const categorizeTask = require('../helpers/categorizeTask');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
  try {
    const taskDescription = req.body['new-todo'];
    console.log(taskDescription);

    // Call the categorizeTask function to categorize the task
    const category = await categorizeTask(taskDescription);

    // Determine the list ID based on the category
    let listId;
    switch (category) {
      case "Movies/Series":
        listId = "movieList";
        break;
      case "Books":
        listId = "bookList";
        break;
      case "Restaurants/Cafes":
        listId = "restaurantList";
        break;
      case "Products":
        listId = "productList";
        break;
    }

    // Send a success response back to the client
    res.status(200).send({ category, listId });
  } catch (error) {
    console.error('Error categorizing task:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;

