import createHttpError from 'http-errors';
import { createTask, deleteTask, updateTask } from '../services/tasks.js';

export const createTaskController = async (req, res) => {
  const { title, description, priority, deadline } = req.body;
  const task = await createTask({
    title,
    description,
    priority,
    deadline,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a task!',
    data: task,
  });
};

export const updateTaskController = async (req, res, next) => {
  const { title, description, priority, deadline } = req.body;
  const { taskId } = req.params;

  const updatedTask = await updateTask(taskId, {
    title,
    description,
    priority,
    deadline,
  });

  if (!updatedTask) {
    return next(createHttpError(404, 'Task not found or unauthorized'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a task!',
    data: updatedTask,
  });
};

export const deleteTaskController = async (req, res, next) => {
  const { taskId } = req.params;

  const task = await deleteTask(taskId);

  if (!task) {
    return next(createHttpError(404, 'Task not found or unauthorized'));
  }

  res.status(204).send();
};

export const moveTaskController = async () => {};
