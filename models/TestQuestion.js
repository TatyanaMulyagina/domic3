module.exports = function(sequelize, DataTypes) {
    var complexRights = {};
    var TestQuestion = sequelize.define('TestQuestion', {
        text:DataTypes.STRING,
        type:DataTypes.ENUM('Many','One','Open')

    }, {
        classMethods: {
        }

    });

    return TestQuestion;
};
