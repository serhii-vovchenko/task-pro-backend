import createHttpError from 'http-errors';
import {
  createTask,
  deleteTask,
  moveTask,
  updateTask,
} from '../services/tasks.js';

export const createTaskController = async (req, res) => {
  const { title, description, priority, deadline } = req.body;
  const { columnId } = req.params;
  const { _id: userId } = req.user;

  const task = await createTask({
    title,
    description,
    priority,
    deadline,
    columnId,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a task!',
    data: task,
  });
};

export const updateTaskController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { title, description, priority, deadline } = req.body;
  const { taskId } = req.params;

  const updatedTask = await updateTask(taskId, userId, {
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
  const { _id: userId } = req.user;
  const { taskId } = req.params;

  const task = await deleteTask(taskId, userId);

  if (!task) {
    return next(createHttpError(404, 'Task not found or unauthorized'));
  }

  res.status(204).send();
};

export const moveTaskController = async (req, res, next) => {
  const { taskId } = req.params;
  const { newColumnId } = req.body;
  const { _id: userId } = req.user;

  if (!taskId || !newColumnId) {
    throw createHttpError(400, 'Task ID and new column ID are required');
  }

  const movedTask = await moveTask(taskId, userId, newColumnId);

  if (!movedTask) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Task moved successfully',
    data: movedTask,
  });
};