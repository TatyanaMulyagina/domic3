module.exports = function(sequelize, DataTypes) {
  var complexRights = {};
  var Right = sequelize.define('Right', {
    name: DataTypes.STRING
  }, {
    // CR --- Complex Right
    classMethods: {
      registerCR: function(name, fn) {
        complexRights[name] = fn;
      },
      isCR: function(name) {
        return complexRights[name] ? true : false
      },
      runCRFunction: function() {
        complexRights[arguments[0]].apply(arguments.slice(1));
      },
      associate: function(models) {
        Right.hasMany(models.User);
      }
    }
  });

  return Right;
};