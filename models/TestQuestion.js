module.exports = function(sequelize, DataTypes) {
    var complexRights = {};
    var TestQuestion = sequelize.define('TestQuestion', {
        text:DataTypes.TEXT,
        type:DataTypes.ENUM('ManyChoice','OneChoice','Open')
    }, {
        classMethods: {
        },
        hooks: {
            afterDestroy:function(question, fn){
                sequelize.TestAnswerChoice.delete({where:["question"]});
                console.log("asdasdf");
           }
        }
    });

    return TestQuestion;
};
