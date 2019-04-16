const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  logging: console.log,
  // port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
const Op = Sequelize.Op;
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.records = require('../models/user.model.js')(sequelize, Sequelize).records;
db.register = require('../models/user.model.js')(sequelize, Sequelize).register;
 
 
module.exports = db;
