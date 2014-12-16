module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Material', {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      type: DataTypes.ENUM("folder","test")
    },
    {
      classMethods:{
        associate: function(models) {
          models.Material.hasMany(models.Material, {as: 'Material', through: 'material_material'} );
          models.Material.hasMany(models.Material, {as: 'OtherMaterial', through: 'material_material'} );
        }
      }
    }
  )
}
