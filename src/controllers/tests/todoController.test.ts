// controllers/tests/todoController.test.ts
import request from "supertest";
import { createApp } from "../../app";
import Todo from "../../models/todoModel";
import { seedDatabase } from "../../testSeed";
import sequelize from "../../config/database";

describe("Todo Controller", () => {
  let app: Express.Application;

  beforeAll(async () => {
    app = createApp();
    await sequelize.sync({ force: true }); // Create tables
    await seedDatabase(); // Seed the database
  });

  afterEach(async () => {
    await Todo.destroy({ where: {} }); // Clean up the data
  });

  describe("GET /api/todos", () => {
    it("should retrieve all todos", async () => {
      const response = await request(app).get("/api/todos");
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveLength(2);
    });
  });

  // Additional tests for getTodo, createTodo, updateTodo, deleteTodo
});
