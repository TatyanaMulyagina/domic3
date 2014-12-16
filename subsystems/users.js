var usersRoutes = require('../routes/users');
var db = require('../models');

module.exports.require = ['auth'];
module.exports.init = function(app, modules, events) {
  // dev configuration
  if (app.get('env') === 'development') {
    db.User.destroy({}, {truncate: true}).success(function(err) {
      db.User.create({email: 'admin@fkn.irk.ru', password: '123456'});
    });
  }

  app.use('/users', usersRoutes);
};