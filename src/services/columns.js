import { ColumnsCollection } from '../db/models/columns.js';

export const getAllColumns = async (boardId, userId) => {
  return await ColumnsCollection.find({ boardId, userId });
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
  const deletedColumn = await ColumnsCollection.findOneAndDelete({
    _id: columnId,
    boardId,
    userId,
  });

  return deletedColumn;
};
