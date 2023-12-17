// controllers/controller.ts
import { Request, Response } from "express";
import Todo from "../models/todoModel";

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.json({ success: true, data: todos });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    res.json({ success: true, data: todo });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newTodo = await Todo.create({ title });
    res.status(201).json(newTodo);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findByPk(id);
    if (todo) {
      todo.title = title || todo.title;
      todo.completed = completed !== undefined ? completed : todo.completed;
      await todo.save();
      res.json(todo);
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.destroy();
      res.status(200).send("Todo deleted successfully");
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
