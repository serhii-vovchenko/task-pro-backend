import { BoardsCollection } from '../db/models/board';

export const getAllBoards = async userId => {
  return await BoardsCollection.find({ userId });
};
