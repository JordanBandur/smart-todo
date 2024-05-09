const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const suggestTodo = async function() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Out of these four categories: Film/Series, Restaurants, Books, and Products, generate a random task related to one of the categories. An exmaple would be "Eat pizza"`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text;
};

module.exports = { suggestTodo };
