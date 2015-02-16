module.exports = function(sequelize, DataTypes) {
    var complexRights = {};
    var TestGroup = sequelize.define('TestGroup', {
        name:DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                TestGroup.hasMany(models.TestQuestion);
            }
        }
    });

    return TestGroup;
};
