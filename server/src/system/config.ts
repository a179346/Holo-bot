// DB CONFIG
process.env.DB_HOST = process.env.DB_HOST || 'db';
process.env.DB_PORT = process.env.DB_PORT || '3306';
process.env.DB_USER_NAME = process.env.DB_USER_NAME || 'mysql_user';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'mysql_password';
process.env.DB_DATABASE = process.env.DB_DATABASE || 'my-db';

const DB = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const config = {
  DB,
};