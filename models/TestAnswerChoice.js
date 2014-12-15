module.exports = function(sequelize, DataTypes) {
    return sequelize.define('TestAnswerChoice', {
        answer:DataTypes.STRING,
        isCorrect:DataTypes.BOOLEAN

    }, {
        classMethods: {
            associate: function(models) {
                models.TestAnswerChoice.belongsTo(models.TestQuestion);
            }
        }
    });
};
