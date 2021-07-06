// eslint-disable-next-line
require('dotenv').config();

if (!process.env.DB_HOST) throw new Error('No HOST');
if (!process.env.DB_PORT) throw new Error('No PORT');
if (!process.env.DB_USER_NAME) throw new Error('No USERNAME');
if (!process.env.DB_PASSWORD) throw new Error('No PASSWORD');
if (!process.env.DB_DATABASE) throw new Error('No DATABASE');

module.exports = {
  'type': 'mysql',
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'username': process.env.DB_USER_NAME,
  'password': process.env.DB_PASSWORD,
  'database': process.env.DB_DATABASE,
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