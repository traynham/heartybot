const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', '', '', {
  dialect: 'sqlite',
  //storage: './data/database.sqlite3',
  storage: './data/private/database.sqlite3',
  "logging": false
})

module.exports = sequelize;
