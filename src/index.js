import initMongoConnection from './db/initMongoConnection.js';
import setupServer from './server.js';
import { logger } from './utils/logger.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    logger.info(error.message);
  }
};

bootstrap();
