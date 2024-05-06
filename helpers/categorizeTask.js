const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

// // access the API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


function categorizeTask(taskDescription) {
  taskDescription = taskDescription.toLowerCase();

  // Keywords for Movies/Series
  const movieKeywords = ["watch", "see", "stream", "movie", "film", "episode", "series"];
  // Keywords for Restaurants/Cafes
  const restaurantKeywords = ["eat", "dine", "restaurant", "cafe", "food", "meal"];
  // Keywords for Books
  const bookKeywords = ["read", "book", "novel", "chapter", "author", "literature"];
  // Keywords for Products
  const productKeywords = ["buy", "purchase", "shop", "order", "product", "item"];

  // Check if any keywords from each category are included in the task description
  if (movieKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Movies/Series";
  } else if (restaurantKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Restaurants/Cafes";
  } else if (bookKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Books";
  } else if (productKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Products";
  } else {
    return "Uncategorized";  // Default category if no keywords match
  }
}

module.exports = categorizeTask;
