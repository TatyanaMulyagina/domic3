var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Role.hasMany(models.Right);
      }
    }
  });
};