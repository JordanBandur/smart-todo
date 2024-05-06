
const categorizeTask = require('./categorizeTask');

async function testCategorizeTask() {
  const taskDescriptions = [
    "Watch Harry Potter",
    "Eat at Joe's Diner",
    "Read the latest Stephen King novel",
    "Buy a new laptop",
    "Write a report", // doesn't have a keyword, so should input it into closest resembling category (products?)
    "go to starbucks", // should be cafe/restaurant
    "stare at the stars" //should be uncategorized
  ];

  for (const description of taskDescriptions) {
    const category = await categorizeTask(description);
    console.log(`Task: '${description}' is categorized as '${category}'`);
  }
}

testCategorizeTask();
