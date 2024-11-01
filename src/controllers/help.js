import { helpMailService } from '../services/help.js';

export const helpMailController = async (req, res) => {
  await helpMailService(req.body.email, req.body.userMessage);
  res.json({
    status: 200,
    message: 'Your request for help has been sent successfully',
    data: {},
  });
};
