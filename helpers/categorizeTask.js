
// THIS WILL NOT WORK UNLESS YOU ARE USING NODE V.18 OR ABOVE!!!! RUN 'nvm use 18' in terminal if you are getting errors.
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// define keyword arrays outside the function. can add to this.
const movieKeywords = ["watch", "see", "stream", "movie", "film", "episode", "series"];
const restaurantKeywords = ["eat", "dine", "restaurant", "cafe", "food", "meal"];
const bookKeywords = ["read", "book", "novel", "chapter", "author", "literature"];
const productKeywords = ["buy", "purchase", "shop", "order", "product", "item"];

// async function to categorize tasks (todo's). Async because it needs to await the responses from google gemini
async function categorizeTask(taskDescription) {
  taskDescription = taskDescription.toLowerCase();

  // check if any keywords from each category are included in the task description
  if (movieKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Movies/Series";
  } else if (restaurantKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Restaurants/Cafes";
  } else if (bookKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Books";
  } else if (productKeywords.some(keyword => taskDescription.includes(keyword))) {
    return "Products";
  } else {
    // use google gemini with a prompt if no keywords match. Gemini will try to figure it out
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Out of these four categories: Films/TV Series, Restaurants/Cafes, Books, and Products, which category would the task "${taskDescription}" most likely fall into?`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // hopefully extract category from the generated text. function defined below.
    const category = extractCategoryFromText(text);
    return category;
  }
}

// function to extract category from text
function extractCategoryFromText(text) {
  text = text.toLowerCase(); // Convert text to lowercase for case-insensitive matching

  // check if any keywords from each category are included in the text
  if (movieKeywords.some(keyword => text.includes(keyword))) {
    return "Movies/Series";
  } else if (restaurantKeywords.some(keyword => text.includes(keyword))) {
    return "Restaurants/Cafes";
  } else if (bookKeywords.some(keyword => text.includes(keyword))) {
    return "Books";
  } else if (productKeywords.some(keyword => text.includes(keyword))) {
    return "Products";
  } else {
    return "Movies/Series"; // unable to determine category from text, put into Movies/Series for now (can change this later)
  }
}

module.exports = categorizeTask;
