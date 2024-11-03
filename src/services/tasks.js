import { TasksCollection } from '../db/models/task.js';

export const createTask = async ({
  title,
  description,
  priority,
  deadline,
  columnId,
  userId,
}) => {
  const newTask = await TasksCollection.create({
    title,
    description,
    priority,
    deadline,
    columnId,
    userId,
  });
  return newTask;
};

export const updateTask = async (taskId, userId, payload) => {
  const updatedTask = await TasksCollection.findOneAndUpdate(
    {
      _id: taskId,
      userId,
    },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedTask;
};

export const deleteTask = async (taskId, userId) => {
  const deletedTask = await TasksCollection.findOneAndDelete({
    _id: taskId,
    userId,
  });

  return deletedTask;
};

export const moveTask = async (taskId, userId, newColumnId) => {
  const movedTask = await TasksCollection.findOneAndUpdate(
    { _id: taskId, userId },
    { columnId: newColumnId },
    { new: true },
  );

  if (!movedTask) {
    throw new Error('Task not found');
  }

  return movedTask;
};
