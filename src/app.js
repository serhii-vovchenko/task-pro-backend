import express from 'express';
import cors from 'cors';
import pinoMiddleware from 'pino-http';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import { logger } from './utils/logger.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { UPLOAD_DIR } from './constants/swagger.js';

const app = express();

app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
  }),
);

app.use(cors());
app.use(cookieParser());

app.use(pinoMiddleware({ logger }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Home page Task Pro!',
  });
});

app.use(router);

app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api-docs', swaggerDocs());

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
