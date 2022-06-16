const dbConfig = require("../config/db.config.js");

// Initialize Sequelize ORM with the configs in db.config.js
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Define and export db with the model in contract.model.js
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.contract = require("./contract.model.js")(sequelize, Sequelize);
module.exports = db;