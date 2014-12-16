module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Course', {
            name: DataTypes.STRING,
            beginAt: DataTypes.DATE,
            endAt: DataTypes.DATE
        },
        {
            classMethods:{
                associate: function(models) {
                    models.Course.belongsTo(models.Material);
                    //models.Course.hasOne(models.Material);
                }
            }
        }
    )
}

