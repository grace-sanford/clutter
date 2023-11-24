import express, { Request, Response } from 'express';

const router = express.Router();

interface Todo {
  id: number;
  // Add other properties of Todo
}

const todosMap: Map<number, Todo> = new Map();

router.post('/', (req: Request, res: Response) => {
  if (typeof req.body === 'object') {
    const todo: Todo = req.body.todo;
    const todo_id = todo.id;
    todosMap.set(todo_id, todo);
    res.status(201).json(todo);
  } else {
    res.status(400).json({ error: 'Invalid todo' });
  }
});

router.get('/', (req: Request, res: Response) => {
  res.status(200).json(Array.from(todosMap.values()));
});

router.get('/:id', (req: Request, res: Response) => {
  const todo_id: number = +req.params?.id;
  const todo = todosMap.get(todo_id);
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

router.put('/:id', (req: Request, res: Response) => {
  const todo_id: number = +req.params?.id;
  const existingTodo = todosMap.get(todo_id);

  if (typeof req.body === 'object' && existingTodo) {
    const updatedTodo: Todo = req.body.todo;
    todosMap.set(todo_id, updatedTodo);
    res.status(200).json(updatedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  const todo_id: number = +req.params?.id;
  const todo = todosMap.get(todo_id);
  if (todo) {
    todosMap.delete(todo_id);
    res.status(204).send('deleted');
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

export default router;