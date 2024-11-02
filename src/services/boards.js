import createHttpError from 'http-errors';
import { BoardsCollection } from '../db/models/board.js';
import { IconsCollection } from '../db/models/icons.js';
import { BackgroundCollection } from '../db/models/backgrounds.js';

export const getAllBoards = async userId => {
  return await BoardsCollection.find({ userId });
};

export const getBoardById = async (boardId, userId) => {
  return await BoardsCollection.findOne({ _id: boardId, userId });
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
  const board = await BoardsCollection.findOneAndDelete({
    _id: boardId,
    userId,
  });
  return board;
};
