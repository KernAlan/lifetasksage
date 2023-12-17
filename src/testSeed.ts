// testSeed.js
import Todo from "./models/todoModel";

export const seedData = [
    { title: "Todo 1", completed: false },
    { title: "Todo 2", completed: true },
    { title: "Todo 3", completed: false},
    { title: "Todo 4", completed: true},
    { title: "Todo 5", completed: false},
    { title: "Todo 6", completed: true},
    { title: "Todo 7", completed: false}
    // ... more test data
    ];

export const seedDatabase = async () => {
  await Todo.bulkCreate(seedData);
};
