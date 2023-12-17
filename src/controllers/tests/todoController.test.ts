// controllers/tests/todoController.test.ts
import request from "supertest";
import { createApp } from "../../app";
import Todo from "../../models/todoModel";
import { seedData, seedDatabase } from "../../testSeed";
import sequelize from "../../config/database";

describe("Todo Controller", () => {
  let app: Express.Application;

  beforeAll(async () => {
    console.log("Initiating app for testing...");
    app = createApp();
    console.log("Syncing database...");
    await sequelize.sync({ force: true }); // Create tables
    console.log("Seeding database...");
    await seedDatabase(); // Seed the database
  });

  //  It's a good practice to ensure each test is independent.
  beforeEach(async () => {
    await sequelize.sync({ force: true });
    await seedDatabase();
  });

  afterEach(async () => {
    await Todo.destroy({ where: {} }); // Clean up the data
  });

  afterAll(async () => {
    await Todo.destroy({ where: {} }); // Clean up the data
  });

  describe("GET /api/todos", () => {
    it("should retrieve all todos", async () => {
      const response = await request(app).get("/api/todos");
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveLength(seedData.length);
    });
  });

  describe("GET /api/todos/:id", () => {
    let existingTodoId: number;

    beforeEach(async () => {
      await sequelize.sync({ force: true });
      await seedDatabase();
      const todos = await Todo.findAll();
      existingTodoId = todos[0].id; // Get the ID of the first seeded todo
    });

    it("should retrieve a specific todo", async () => {
      const response = await request(app).get(`/api/todos/${existingTodoId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(existingTodoId);
    });

    it("should return a 404 for a non-existent todo", async () => {
      const response = await request(app).get("/api/todos/9999");
      expect(response.statusCode).toBe(404);
    });
  });

  describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
      const newTodo = { title: "New Todo" };
      const response = await request(app).post("/api/todos").send(newTodo);
      expect(response.statusCode).toBe(201);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.title).toBe("New Todo");
    });

    it("should return a 400 for invalid data", async () => {
      const response = await request(app).post("/api/todos").send({});
      expect(response.statusCode).toBe(400);
    });
  });

  describe("PUT /api/todos/:id", () => {
    it("should update an existing todo", async () => {
      const updatedData = { title: "Updated Todo", completed: true };
      const response = await request(app).put("/api/todos/1").send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body.data.title).toBe("Updated Todo");
      expect(response.body.data.completed).toBe(true);
    });

    it("should return a 404 for a non-existent todo", async () => {
      const updatedData = { title: "Updated Todo", completed: true };
      const response = await request(app)
        .put("/api/todos/9999")
        .send(updatedData);
      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/todos/:id", () => {
    it("should delete an existing todo", async () => {
      const response = await request(app).delete("/api/todos/1");
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Todo deleted successfully.");
    });

    it("should return a 404 for a non-existent todo", async () => {
      const response = await request(app).delete("/api/todos/9999");
      expect(response.statusCode).toBe(404);
    });
  });
});
