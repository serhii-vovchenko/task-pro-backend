import createHttpError from 'http-errors';
import {
  createTask,
  deleteTask,
  moveTask,
  updateTask,
} from '../services/tasks.js';

export const createTaskController = async (req, res) => {
  const { title, description, priority, deadline, columnId } = req.body;
  console.log(req.body);
  const { _id: userId } = req.user;

  const task = await createTask({
    title,
    description,
    priority,
    deadline,
    userId,
    columnId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a task!',
    data: {
      task: {
        id: task._id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        userId,
        columnId,
      },
    },
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
  const { columnId } = req.body;
  const { _id: userId } = req.user;

  if (!taskId || !columnId) {
    throw createHttpError(400, 'Task ID and new column ID are required');
  }

  const movedTask = await moveTask(taskId, userId, columnId);

  if (!movedTask) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Task moved successfully',
    data: movedTask,
  });
};
