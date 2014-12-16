var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Role.hasMany(models.User);
      }
    },
    instanceMethods: {
      validPassword: function(password, done) {
        bcrypt.compare(password, this.password, done);
      },
      hasAccess: function(right, object, done) {
        this.hasRight(right).success(function(res) {
          if (res) {
            if (right.Model.isComplexRight(right.name)) {
              right.Model.runComplexRightFunction(right.name, object, done);
            } else {
              done(true);
            }
          } else {
            done(false);
          }
        });
      }
    },
    hooks: {
      beforeCreate: function(user, fn) {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) {fn(err);}
          bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {fn(err);}
            user.password = hash;
            fn(null, hash);
          });
        });
      }
    }
  });
};