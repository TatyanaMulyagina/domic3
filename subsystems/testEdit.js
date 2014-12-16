var testRoutes = require('../routes/testEdit')
    , db = require('../models');

module.exports.require = ['auth'];
module.exports.init = function(app, modules, events) {

    app.param('idGroup', function (req, res, next, id) {
        console.log('CALLED ONLY ONCE');
        next();
    })

    app.use('/test/:idTest/edit', testRoutes);
};