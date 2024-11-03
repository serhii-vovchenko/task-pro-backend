import { ColumnsCollection } from '../db/models/columns.js';
import { TasksCollection } from '../db/models/task.js';

export const getAllColumns = async (boardId, userId) => {
  const columns = await ColumnsCollection.find({ boardId, userId });

  if (columns && columns.length === 0) return [];
  const columnsIds = columns.map(column => column._id);

  const tasks = await TasksCollection.find({ columnId: { $in: columnsIds } });

  const columnsWithTasks = columns.map(column => {
    const columnObj = column.toObject();
    const filteredTasks = tasks.filter(task =>
      task.columnId.equals(column._id),
    );
    columnObj.tasks = filteredTasks.length > 0 ? filteredTasks : [];
    return columnObj;
  });

  return columnsWithTasks;
};

export const createColumn = async payload => {
  const newColumn = await ColumnsCollection.create(payload);
  return newColumn;
};

export const updateColumn = async (columnId, userId, boardId, payload) => {
  console.log(payload);
  const updatedColumn = await ColumnsCollection.findOneAndUpdate(
    {
      _id: columnId,
      boardId,
      userId,
    },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedColumn) {
    return null;
  }
  return updatedColumn;
};

export const deleteColumn = async (columnId, userId, boardId) => {
  await TasksCollection.deleteMany({ columnId });

  const deletedColumn = await ColumnsCollection.findOneAndDelete({
    _id: columnId,
    boardId,
    userId,
  });

  return deletedColumn;
};
