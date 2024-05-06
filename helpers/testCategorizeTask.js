const dotenv = require("dotenv");
dotenv.config();

const categorizeTask = require('./categorizeTask');

async function testCategorizeTask() {
  const taskDescriptions = [
    "Watch Harry Potter",
    "Eat at Joe's Diner",
    "Read the latest Stephen King novel",
    "Buy a new laptop",
    "Write a report" // doesn't have a keyword, so should input it into closest resembling category
  ];

  for (const description of taskDescriptions) {
    const category = await categorizeTask(description);
    console.log(`Task: '${description}' is categorized as '${category}'`);
  }
}

testCategorizeTask();
