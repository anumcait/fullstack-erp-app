// config/db.js
const { Sequelize } = require('sequelize');
//require('dotenv').config();

const DB_DIALECT = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: DB_DIALECT,
    port: process.env.DB_PORT,
    logging: console.log,
  }
);

module.exports = sequelize;
