// testSeed.js
import Todo from "./models/todoModel";

export const seedDatabase = async () => {
  const todos = [
    { title: "Todo 1", completed: false },
    { title: "Todo 2", completed: true },
    // ... more test data
  ];

  await Todo.bulkCreate(todos);
};
