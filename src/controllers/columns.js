import createHttpError from 'http-errors';
import {
  createColumn,
  deleteColumnAndTasks,
  getAllColumns,
  updateColumn,
} from '../services/columns.js';

export const getColumnsController = async (req, res, next) => {
  const columns = await getAllColumns(req.boardId, req.user._id);
  if (!columns) return next(createHttpError(404, 'Columns not found'));
  res.json({
    status: 200,
    message: 'Successfully found columns',
    data: columns,
  });
};

export const createColumnController = async (req, res) => {
  const { title } = req.body;
  const { _id: userId } = req.user;
  const { boardId } = req;

  const column = await createColumn({
    title,
    userId,
    boardId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a column!',
    data: column,
  });
};

export const updateColumnController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { title } = req.body;
  const { boardId } = req;
  const { columnId } = req.params;

  const updatedColumn = await updateColumn(columnId, userId, boardId, {
    title,
  });

  if (!updatedColumn) {
    return next(createHttpError(404, 'Column not found or unauthorized'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a column!',
    data: updatedColumn,
  });
};

export const deleteColumnAndTasksController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { columnId } = req.params;
  const { boardId } = req;

  const column = await deleteColumnAndTasks(columnId, userId, boardId);

  if (!column) {
    return next(createHttpError(404, 'Column not found or unauthorized'));
  }

  res.status(204).send();
};
