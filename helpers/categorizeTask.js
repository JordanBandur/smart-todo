// uses google gemini for ai help
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



    // if no keywords match, use the AI model (google gemini) to help categorize the task
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Out of these four categories: Films/TV Series, Restaurants/Cafes, Books, and Products, which category would the task "${taskDescription}" most likely fall into?`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // extract category from the generated text
    const category = extractCategoryFromText(text);
    return category || "Uncategorized";
  }
}



// extracts category from the text if it can

function extractCategoryFromText(text) {
  text = text.toLowerCase(); // convert text to lowercase for case-insensitive matching

  // keywords for Movies/Series. Can add more keywords than were mentioned previously in the code
  const movieKeywords = ["movie", "film", "series", "tv show", "cinema"];

  // keywords for Restaurants/Cafes
  const restaurantKeywords = ["restaurant", "cafe", "diner", "eatery", "bistro", "pub"];

  // keywords for Books
  const bookKeywords = ["book", "novel", "story", "literature", "author"];

  // keywords for Products
  const productKeywords = ["product", "item", "purchase", "buy", "shop"];

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
    // If no keywords match, prioritize categories in a predetermined order
    const priorityOrder = ["Movies/Series", "Restaurants/Cafes", "Books", "Products"];
    return priorityOrder[0]; // Return the first category in the priority order
  }
};

module.exports = categorizeTask;
