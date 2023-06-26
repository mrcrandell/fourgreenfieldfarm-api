const express = require('express');
const { Sequelize } = require('sequelize');

const {
  DATABASE_DIALECT,
  SQL_DATABASE,
  READER_SQL_HOST,
  WRITER_SQL_HOST,
  SQL_HOST,
  SQL_USER,
  SQL_PASSWORD,
} = process.env;

const sequelize = new Sequelize(SQL_DATABASE, SQL_USER, SQL_PASSWORD, {
  host: SQL_HOST,
  dialect: DATABASE_DIALECT
});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    //console.log('Connection has been established successfully.');
    res.json({ router: 'OK', database: 'OK' });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
});

module.exports = router;