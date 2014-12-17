var fs        = require('fs')
  , path      = require('path');

module.exports = function(app, events) {
  var modules   = {};

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.substring(file.length - 3) === '.js')
    })
    .forEach(function(file) {
      var module = require(path.join(__dirname, file));
      module.name = file.substring(0, file.length - 3);
      modules[module.name] = module;
    });

  function initModule(modules, module) {
    if (!module.isInitialized) {
      if (module.require) {
        module.require.forEach(function (moduleName2) {
          initModule(modules, modules[moduleName2]);
        });
      }
      console.log("subsystem: " + module.name);
      module.init(app, modules, events);
      module.isInitialized = true;
    }
  }

  Object.keys(modules).forEach(function(module) {
    initModule(modules, modules[module]);
  });
  return modules;
};