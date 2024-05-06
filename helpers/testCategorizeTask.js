const categorizeTask = require('./categorizeTask');

function testCategorizeTask() {
  const taskDescriptions = [
    "Watch Harry Potter",
    "Eat at Joe's Diner",
    "Read the latest Stephen King novel",
    "Buy a new laptop"
  ];

  taskDescriptions.forEach(description => {
    const category = categorizeTask(description);
    console.log(`Task: '${description}' is categorized as '${category}'`);
  });
}

testCategorizeTask();


