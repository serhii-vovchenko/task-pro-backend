import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToСloudinary.js';
import { IconsCollection } from '../db/models/icons.js';

export const uploadAndSaveIcon = async (file, name, folderName) => {
  try {
    const iconUrl = await saveFileToCloudinary(file, folderName);

    const iconData = {
      name,
      iconUrl,
    };

    const newIcon = new IconsCollection(iconData);
    await newIcon.save();

    return newIcon;
  } catch (error) {
    throw createHttpError('Error during the saving icon to DB:', error);
  }
};
