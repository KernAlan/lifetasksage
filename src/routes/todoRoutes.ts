// routes/routes.ts

import { Router } from 'express';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../controllers/controller';

const router = Router();

router.get('/', getAllTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
