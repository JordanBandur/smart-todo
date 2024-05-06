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


  // This might be in the same file where you define categorizeTask or a separate one.


  module.exports = categorizeTask; // Export the function for use in other files
