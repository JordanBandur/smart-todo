// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const dotenv = require("dotenv");
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// async function categorizeTask(taskDescription) {
//   taskDescription = taskDescription.toLowerCase();

//   //keywords for categorization
//   const movieKeywords = ["watch", "see", "stream", "movie", "film", "episode", "series"];
//   const restaurantKeywords = ["eat", "dine", "restaurant", "cafe", "food", "meal"];
//   const bookKeywords = ["read", "book", "novel", "chapter", "author", "literature"];
//   const productKeywords = ["buy", "purchase", "shop", "order", "product", "item"];

//   if (movieKeywords.some(keyword => taskDescription.includes(keyword))) {
//     return "Movies/Series";
//   } else if (restaurantKeywords.some(keyword => taskDescription.includes(keyword))) {
//     return "Restaurants/Cafes";
//   } else if (bookKeywords.some(keyword => taskDescription.includes(keyword))) {
//     return "Books";
//   } else if (productKeywords.some(keyword => taskDescription.includes(keyword))) {
//     return "Products";
//   } else {
//     return "Uncategorized";
//   }
// }

// module.exports = categorizeTask;


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
    // If no keywords match, use the AI model to categorize the task
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = taskDescription;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Extract category from the generated text
    const category = extractCategoryFromText(text);
    return category || "Uncategorized";
  }
}

// Function to extract category from the AI-generated text
function extractCategoryFromText(text) {
  // Example logic to extract category from text
  // Modify this based on the actual format and content of the generated text
  if (text.includes("movie")) {
    return "Movies/Series";
  } else if (text.includes("restaurant")) {
    return "Restaurants/Cafes";
  } else if (text.includes("book")) {
    return "Books";
  } else if (text.includes("product")) {
    return "Products";
  } else {
    return null; // Unable to determine category from text
  }
}

module.exports = categorizeTask;
