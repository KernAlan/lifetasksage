import { NextFunction, Request, Response } from "express";
import Todo from "../models/todoModel";

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todo.findAll();
    res.json({ success: true, data: todos });
  } catch (error: any) {
    next({ status: 500, message: error.message, stack: error.stack });
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    res.json({ success: true, data: todo });
  } catch (error: any) {
    next({ status: 500, message: error.message, stack: error.stack });
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }
    const newTodo = await Todo.create({ title });
    res.status(201).json({ success: true, data: newTodo });
  } catch (error: any) {
    next({ status: 500, message: error.message, stack: error.stack });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    todo.title = title || todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;
    await todo.save();
    res.json({ success: true, data: todo });
  } catch (error: any) {
    next({ status: 500, message: error.message, stack: error.stack });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    await todo.destroy();
    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully." });
  } catch (error: any) {
    next({ status: 500, message: error.message, stack: error.stack });
  }
};
