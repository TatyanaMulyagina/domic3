module.exports = function(sequelize, DataTypes) {
    return sequelize.define('TextMaterial', {
            Name: DataTypes.STRING,
            source: DataTypes.TEXT,
            compiled: DataTypes.TEXT
          //  type: DataTypes.ENUM("TYPE1", "TYPE2")
        },
        {
            classMethods:{
                associate: function(models) {
                    models.Material.belongsTo(models.TextMaterial, {as: 'textMaterial'} );
                }
            }
        }
    )
}
