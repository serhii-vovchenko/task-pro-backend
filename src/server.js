import app from './app.js';
import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
};

export default setupServer;
