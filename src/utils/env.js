import dotenv from 'dotenv';

dotenv.config();

export function env(value, defaultPort) {
  const port = process.env[value];

  if (port) return port;

  if (defaultPort) return defaultPort;

  throw new Error(`Missing: process.env['${port}']`);
}
