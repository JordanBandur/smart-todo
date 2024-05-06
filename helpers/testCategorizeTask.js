const categorizeTask = require('./helpers/categorizeTask'); // Adjust the path based on your project structure

categorizeTask('Read the new book by J.K. Rowling')
  .then(data => {
    console.log('Categorization Results:', data);
  })
  .catch(err => {
    console.error('Error categorizing task:', err);
  });
