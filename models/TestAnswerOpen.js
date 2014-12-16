module.exports = function(sequelize, DataTypes) {
    var complexRights = {};
    var TestAnswerOpen = sequelize.define('TestAnswerOpen', {
        text:DataTypes.STRING,
        type:DataTypes.ENUM('auto','manual')
    }, {
        classMethods: {
            associate: function(models) {
                models.TestQuestion.hasOne(TestAnswerOpen);
            }
        }
    });

    return TestAnswerOpen;
};
