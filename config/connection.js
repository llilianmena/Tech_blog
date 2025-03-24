// config/connection.js
require('dotenv').config();
const Sequelize = require('sequelize');

// Create a new Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the PostgreSQL database:', err);
  });

module.exports = sequelize;
