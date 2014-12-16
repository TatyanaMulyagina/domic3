module.exports = function(sequelize, DataTypes) {
  var complexRights = {};
  return sequelize.define('Right', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      registerComplexRight: function(name, fn) {
        complexRights[name] = fn;
      },
      isComplexRight: function(name) {
        return complexRights[name] ? true : false
      },
      runComplexRightFunction: function() {
        complexRights[arguments[0]].apply(arguments.slice(1));
      }
    }
  });
};