import dotenv from 'dotenv';
dotenv.config();

// DISCORD BOT
process.env.DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || 'DISCORD_BOT_TOKEN';
process.env.DISCORD_BOT_USER_ID = process.env.DISCORD_BOT_USER_ID || 'DISCORD_BOT_USER_ID';
// HOLO API
process.env.HOLO_API_URL = process.env.HOLO_API_URL || 'https://api.holotools.app/v1/';
process.env.HOLO_API_TIMEOUT = process.env.HOLO_API_TIMEOUT || '10000'; // 10 seconds
// DB
process.env.DB_HOST = process.env.DB_HOST || 'db';
process.env.DB_PORT = process.env.DB_PORT || '3306';
process.env.DB_USER_NAME = process.env.DB_USER_NAME || 'mysql_user';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'mysql_password';
process.env.DB_DATABASE = process.env.DB_DATABASE || 'my-db';

const DISCORD_BOT = {
  TOKEN: process.env.DISCORD_BOT_TOKEN,
  USER_ID: process.env.DISCORD_BOT_USER_ID,
};

const HOLO_API = {
  URL: process.env.HOLO_API_URL,
  TIMEOUT: parseInt(process.env.HOLO_API_TIMEOUT, 10),
};

const DB = {
  HOST: process.env.DB_HOST,
  PORT: parseInt(process.env.DB_PORT, 10),
  USERNAME: process.env.DB_USER_NAME,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE,
};

export const config = {
  DB,
  HOLO_API,
  DISCORD_BOT,
};