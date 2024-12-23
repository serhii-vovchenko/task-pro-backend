import createHttpError from 'http-errors';
import { BoardsCollection } from '../db/models/board.js';
import { IconsCollection } from '../db/models/icons.js';
import { BackgroundCollection } from '../db/models/backgrounds.js';
import { sortNumberInStr } from '../utils/sortNumberInStr.js';
import { getAllColumns } from './columns.js';
import { TasksCollection } from '../db/models/task.js';
import { ColumnsCollection } from '../db/models/columns.js';

export const getAllBoards = async userId => {
  return await BoardsCollection.find({ userId });
};

export const getBoardById = async (boardId, userId) => {
  const board = await BoardsCollection.findOne({ _id: boardId, userId });
  return board;
};

export const getBoardByIdAndMakeBoardActive = async ({
  boardId,
  userId,
  previous_boardId,
}) => {
  let isActive = false;

  if (!previous_boardId) {
    await BoardsCollection.updateMany({ userId }, { isActive: false });
  } else {
    await BoardsCollection.findOneAndUpdate(
      { _id: previous_boardId, userId },
      { isActive },
    );
  }
  isActive = true;
  const rawData = await BoardsCollection.findOneAndUpdate(
    { _id: boardId, userId },
    { isActive },
    {
      includeResultMetadata: true,
      new: true,
    },
  );

  if (!rawData || !rawData.value) return null;

  const board = rawData.value.toObject();
  const columns = await getAllColumns(boardId, userId);
  board.columns = columns?.length > 0 ? columns : [];

  return board;
};

export const addBoard = async ({
  title,
  iconName,
  backgroundName = '',
  userId,
}) => {
  const iconData = await IconsCollection.findOne({ name: iconName });
  if (!iconData) return createHttpError(404, 'Icon not found');
  const payload = {
    title,
    icon: {
      name: iconData.name,
      iconUrl: iconData.iconUrl,
    },
    userId,
  };
  if (backgroundName) {
    const background = await BackgroundCollection.findOne({
      name: backgroundName,
    });
    if (!background) return createHttpError(404, 'Background not found');
    payload.backgrounds = {
      name: background.name,
      modalUrl: background.modalUrl,
      resolution: background.resolution,
    };
  }

  const board = await BoardsCollection.create(payload);
  return board;
};

export const updateBoard = async ({
  title = '',
  iconName = '',
  backgroundName = '',
  boardId,
  userId,
}) => {
  const payload = {};
  if (title) payload.title = title;

  if (iconName) {
    const iconData = await IconsCollection.findOne({ name: iconName });
    if (!iconData) return createHttpError(404, 'Icon not found');
    payload.icon = {
      name: iconData.name,
      iconUrl: iconData.iconUrl,
    };
  }

  if (backgroundName) {
    const background = await BackgroundCollection.findOne({
      name: backgroundName,
    });
    if (!background) return createHttpError(404, 'Background not found');
    payload.backgrounds = {
      name: background.name,
      modalUrl: background.modalUrl,
      resolution: background.resolution,
    };
  }

  const rawData = await BoardsCollection.findOneAndUpdate(
    { _id: boardId, userId },
    payload,
    {
      includeResultMetadata: true,
      new: true,
    },
  );

  if (!rawData || !rawData.value) return null;

  return {
    board: rawData.value,
    isNew: Boolean(rawData?.lastErrorObject?.upserted),
  };
};

export const deleteBoard = async (boardId, userId) => {
  const columns = await getAllColumns(boardId, userId);

  columns.forEach(async column => {
    await TasksCollection.deleteMany({ columnId: column._id });
  });

  await ColumnsCollection.deleteMany({ boardId });

  const board = await BoardsCollection.findOneAndDelete({
    _id: boardId,
    userId,
  });
  return board;
};

export const getBackgroundsAndIcons = async () => {
  const icons = await IconsCollection.find().select('_id name iconUrl');
  if (!icons) return createHttpError(404, 'Icons not found');
  sortNumberInStr(icons);

  const backgrounds = await BackgroundCollection.find().select(
    '_id name modalUrl',
  );
  if (!backgrounds) return createHttpError(404, 'Backgrounds not found');
  sortNumberInStr(backgrounds);
  return {
    icons,
    backgrounds,
  };
};
