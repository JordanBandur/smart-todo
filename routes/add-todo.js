const express = require('express');
const router = express.Router(); // Create a router instance
const bodyParser = require('body-parser'); // Import body-parser middleware
const categorizeTask = require('../helpers/categorizeTask');

// Middleware to parse request body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Define a route handler for handling POST requests to "/"
router.post('/', async (req, res) => {
  try {
    // Extract task data from the request body
    const taskDescription = req.body['new-todo']; // Corrected here

    // Call the categorizeTask function to categorize the task
    const category = await categorizeTask(taskDescription);

    // Handle the categorized task based on the category
    // Here, you can add logic to add the task to the correct list
    switch (category) {
      case "Movies/Series":
        // Add the task to the Movies/Series list
        // Example: Your code to add the task to the Movies/Series list
        break;
      case "Books":
        // Add the task to the Books list
        // Example: Your code to add the task to the Books list
        break;
      case "Restaurants/Cafes":
        // Add the task to the Restaurants/Cafes list
        // Example: Your code to add the task to the Restaurants/Cafes list
        break;
      case "Products":
        // Add the task to the Products list
        // Example: Your code to add the task to the Products list
        break;
      default:
        // Handle default case or uncategorized tasks
        // Example: Your code to handle uncategorized tasks
        break;
    }

    // Send a success response back to the client
    res.status(200).send('Task categorized successfully');
  } catch (error) {
    // Handle any errors
    console.error('Error categorizing task:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router; // Export the router instance
