
// THIS WILL NOT WORK UNLESS YOU ARE USING NODE V.18 OR ABOVE!!!! RUN 'nvm use 18' in terminal if you are getting errors.
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


    console.log('beforemodel')
    // if no keywords match, use the AI model (google gemini) to help categorize the task
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log('aftermodel')

    const prompt = `Out of these four categories: Films/TV Series, Restaurants/Cafes, Books, and Products, which category would the task "${taskDescription}" most likely fall into?`;
    const result = await model.generateContent(prompt);
    console.log(result);

    const response = await result.response;
    const text = await response.text();



    // extract category from the generated text
    const category = extractCategoryFromText(text);
    return category || "Uncategorized";
  }
}



function extractCategoryFromText(text) {
  text = text.toLowerCase(); // Convert text to lowercase for case-insensitive matching

  // Keywords for Movies/Series
  const movieKeywords = ["movie", "film", "series", "tv show", "cinema"];

  // Keywords for Restaurants/Cafes
  const restaurantKeywords = ["restaurant", "cafe", "diner", "eatery", "bistro", "pub"];

  // Keywords for Books
  const bookKeywords = ["book", "novel", "story", "literature", "author"];

  // Keywords for Products
  const productKeywords = ["product", "item", "purchase", "buy", "shop"];

  // Check if any keywords from each category are included in the text
  if (movieKeywords.some(keyword => text.includes(keyword))) {
    return "Movies/Series";
  } else if (restaurantKeywords.some(keyword => text.includes(keyword))) {
    return "Restaurants/Cafes";
  } else if (bookKeywords.some(keyword => text.includes(keyword))) {
    return "Books";
  } else if (productKeywords.some(keyword => text.includes(keyword))) {
    return "Products";
  } else {
    return "Movies/Series"; // Unable to determine category from text
  }
}


module.exports = categorizeTask;
