import createHttpError from 'http-errors';
import { uploadAndSaveBackground } from '../services/backgrounds.js';

export const addBackgroundsController = async (req, res, next) => {
  const { name } = req.body;

  if (!req.files) {
    return next(createHttpError(400, 'No files uploaded.'));
  }

  const modalUrlFile = req.files['modalUrl'] ? req.files['modalUrl'][0] : null;
  const mobileFile = req.files['mobile'] ? req.files['mobile'][0] : null;
  const tabletFile = req.files['tablet'] ? req.files['tablet'][0] : null;
  const desktopFile = req.files['desktop'] ? req.files['desktop'][0] : null;

  if (!modalUrlFile || !mobileFile || !tabletFile || !desktopFile) {
    return next(createHttpError(400, 'All files must be uploaded.'));
  }
  const background = await uploadAndSaveBackground(
    [modalUrlFile, mobileFile, tabletFile, desktopFile],
    name,
    'backgrounds',
  );
  res.json({
    status: 200,
    message: 'Background has saved in DB',
    data: background,
  });
};
