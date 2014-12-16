var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var lodash    = require('lodash');
var sequelize = new Sequelize('domic', 'admin', 'admin', {
      dialect: 'postgres'
  });
var events = require('events');
var db     = {};

sequelize.events = new events.EventEmitter();

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize,
  events: sequelize.events
}, db);