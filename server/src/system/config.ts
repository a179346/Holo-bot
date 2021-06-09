import dotenv from 'dotenv';
dotenv.config();

// DISCORD BOT
process.env.DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || 'DISCORD_BOT_TOKEN';
// DB
process.env.DB_HOST = process.env.DB_HOST || 'db';
process.env.DB_PORT = process.env.DB_PORT || '3306';
process.env.DB_USER_NAME = process.env.DB_USER_NAME || 'mysql_user';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'mysql_password';
process.env.DB_DATABASE = process.env.DB_DATABASE || 'my-db';

const DISCORD_BOT = {
  TOKEN: process.env.DISCORD_BOT_TOKEN,
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
  DISCORD_BOT,
};