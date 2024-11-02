import createHttpError from 'http-errors';
import { BackgroundCollection } from '../db/models/backgrounds.js';
import { saveFileToCloudinary } from '../utils/saveFileToСloudinary.js';

export const uploadAndSaveBackground = async (files, name, folderName) => {
  try {
    const modalBackground = await saveFileToCloudinary(files[0], folderName);

    const resolutions = {
      mobile: await saveFileToCloudinary(files[1], folderName),
      tablet: await saveFileToCloudinary(files[2], folderName),
      desktop: await saveFileToCloudinary(files[3], folderName),
    };

    const backgroundData = {
      name,
      modalUrl: modalBackground,
      resolution: resolutions,
    };

    const background = new BackgroundCollection(backgroundData);
    await background.save();

    return background;
  } catch (error) {
    throw createHttpError('Error during the saving background in DB:', error);
  }
};
