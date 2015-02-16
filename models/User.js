var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
    },
    instanceMethods: {
      validPassword: function(password, done) {
        bcrypt.compare(password, this.password, done);
      },
      hasAccess: function(right, object, done) {
        this.hasRight(right).success(function(res) {
          if (res) {
            if (right.Model.isCR(right.name)) {
              right.Model.runCRFunction(right.name, object, done);
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

  return User;
};