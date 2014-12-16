var db = require('../models');
var materialRoutes = require('../routes/materials');

module.exports.init = function(app, modules, events) {

    app.use('/materials', materialRoutes);
};