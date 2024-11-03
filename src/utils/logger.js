import pino from 'pino';

export const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore:
        'res,pid,hostname,req.headers,req.query,req.params,req.body,req.remoteAddress',
      messageFormat: '{req.method} {msg}',
    },
  },
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
      };
    },
  },
});
