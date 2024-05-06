const axios = require('axios');

const apiKey = process.env.GOOGLE_API_KEY;
const url = 'https://language.googleapis.com/v1/documents:analyzeEntities?key=' + apiKey;

async function categorizeTask(taskDescription) {
  const data = {
    document: {
      type: 'PLAIN_TEXT',
      content: taskDescription,
    }
  };

  try {
    const response = await axios.post(url, data);
    return response.data; // Process this data to extract categories
  } catch (error) {
    console.error('Failed to categorize task:', error);
    return null;
  }
}

// Example usage
categorizeTask('Read the new book by J.K. Rowling')
  .then(data => console.log(data))
  .catch(err => console.error(err));
