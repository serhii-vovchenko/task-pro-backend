import { TasksCollection } from '../db/models/task.js';

export const createTask = async payload => {
  const newTask = await TasksCollection.create(payload);
  return newTask;
};

export const updateTask = async (taskId, payload) => {
  const updatedTask = await TasksCollection.findOneAndUpdate(
    {
      _id: taskId,
    },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedTask;
};

export const deleteTask = async taskId => {
  const deletedTask = await TasksCollection.findOneAndDelete({
    _id: taskId,
  });

  return deletedTask;
};

// export const moveTask = async (taskId, newColumnId) => {
//   const task = await TasksCollection.findById(taskId);
//   if (!task) throw new Error('Task not found');

//   const movedTask = await TasksCollection.findByIdAndUpdate(
//     taskId,
//     { columnId: newColumnId },
//     { new: true },
//   );

//   await ColumnsCollection.findByIdAndUpdate(task.columnId, {
//     $pull: { tasks: taskId },
//   });
//   await ColumnsCollection.findByIdAndUpdate(newColumnId, {
//     $push: { tasks: taskId },
//   });

//   return movedTask;
// };
