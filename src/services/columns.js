import { ColumnsCollection } from '../db/models/columns.js';

export const createColumn = async payload => {
  const newColumn = await ColumnsCollection.create(payload);
  return newColumn;
};

export const updateColumn = async (columnId, userId, payload) => {
  const updatedColumn = await ColumnsCollection.findOneAndUpdate(
    {
      _id: columnId,
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

export const deleteColumn = async (columnId, userId) => {
  const deletedColumn = await ColumnsCollection.findOneAndDelete({
    _id: columnId,
    userId,
  });

  return deletedColumn;
};
