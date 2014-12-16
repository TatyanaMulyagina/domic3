module.exports = function(sequelize, DataTypes) {
    var complexRights = {};
    var TestAnswerChoice = sequelize.define('TestAnswerChoice', {
        answer:DataTypes.STRING,
        isCorrect:DataTypes.BOOLEAN

    }, {
        classMethods: {
            associate: function(models) {
                models.TestQuestion.hasOne(TestAnswerChoice,{as:"question"});
            }
        }
    });

    return TestAnswerChoice;
};
