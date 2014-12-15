var testRoutes = require('../routes/testEdit')
    , db = require('../models');

module.exports.require = ['auth'];
module.exports.init = function(app, modules, events) {

    app.param('idTestGroup', function (req, res, next, id) {
        console.log('CALLED ONLY ONCE');
        next();
    })

    app.param('idQuestion', function (req, res, next, id) {
        console.log('CALLED ONLY ONCE');
        next();
    })

    app.param('idTest', function (req, res, next, id) {
        console.log('CALLED ONLY ONCE');
        next();
    })
    app.use('/test', testRoutes);
};