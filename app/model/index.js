// Database
// env options: development, staging or production
const env = (process.env.NODE_ENV || 'localhost').trim()
const config = require('../config/database.json')[env]
const { Sequelize, DataTypes } = require('sequelize')
const db = {}
let connection

if (config.use_env_variable) {
  connection = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    define: {
      ...config.define,
      freezeTableName: true
    }
  })
} else {
  connection = new Sequelize(config.database, config.username, config.password, {
    ...config,
    define: {
      ...config.define,
      freezeTableName: true
    }
  })
}

// Models
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(connection, DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.connection = connection
db.Sequelize = Sequelize

module.exports = db
