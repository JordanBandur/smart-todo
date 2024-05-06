const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function categorizeTask(taskDescription) {
  taskDescription = taskDescription.toLowerCase();

  const movieKeywords = ["watch", "see", "stream", "movie", "film", "episode", "series"];
  const restaurantKeywords = ["eat", "dine", "restaurant", "cafe", "food", "meal"];
  const bookKeywords = ["read", "book", "novel", "chapter", "author", "literature"];
  const productKeywords = ["buy", "purchase", "shop", "order", "product", "item"];

  if (movieKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Movies/Series";
  } else if (restaurantKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Restaurants/Cafes";
  } else if (bookKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Books";
  } else if (productKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Products";
  } else {
    return "Uncategorized";
  }
}

module.exports = categorizeTask;

