const db = require("../db/connection");

/**
 * categorizes a task based on keywords in its title and fetches category ID from the database.
 * @param {string} taskTitle - the title of the task to categorize.
 * @returns {Promise<{id: number, name: string}>} - the category object or null if not found.
 */
async function categorizeTask(taskTitle) {
  taskTitle = taskTitle.toLowerCase(); // convert title to lowercase for easier matching

  // map of potential keywords to category names as they might appear in the database (need to add/change probably)
  const keywordToCategoryName = {
    watch: "Film/Series",
    film: "Film/Series",
    movie: "Film/Series",
    eat: "Restaurants",
    restaurant: "Restaurants",
    cafe: "Restaurants",
    read: "Books",
    book: "Books",
    buy: "Products",
    product: "Products",
  };

  // Find the first matching keyword and its associated category name
  for (const [keyword, categoryName] of Object.entries(keywordToCategoryName)) {
    if (taskTitle.includes(keyword)) {
      // Query the database to find the category ID by name
      const query = "SELECT id FROM categories WHERE name = $1;";
      const result = await db.query(query, [categoryName]);
      if (result.rows.length > 0) {
        return { id: result.rows[0].id, name: categoryName };
      }
      break;
    }
  }

  // Return null or a default 'Uncategorized' category if no keywords matched or category not found
  return { id: null, name: "Uncategorized" };
}

module.exports = categorizeTask;
