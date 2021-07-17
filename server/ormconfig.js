// eslint-disable-next-line
require('dotenv').config();

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || '3306';
const DB_USER_NAME = process.env.DB_USER_NAME || 'mysql_user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'mysql_password';
const DB_DATABASE = process.env.DB_DATABASE || 'my-db';

module.exports = {
  'type': 'mysql',
  'host': DB_HOST,
  'port': DB_PORT,
  'username': DB_USER_NAME,
  'password': DB_PASSWORD,
  'database': DB_DATABASE,
  'synchronize': false,
  'logging': false,
  'charset': 'utf8mb4',
  'entities': [
    'src/entity/**/*.{js,ts}'
  ],
  'migrations': [
    'src/migration/**/*.{js,ts}'
  ],
  'subscribers': [
    'src/subscriber/**/*.{js,ts}'
  ],
  'cli': {
    'entitiesDir': 'src/entity',
    'migrationsDir': 'src/migration',
    'subscribersDir': 'src/subscriber'
  }
};