var fs          = require('fs')
  	, path      = require('path')
	, Sequelize = require('sequelize')
	, _         = require('underscore');

var options = {};
_.each(_.keys(DB_config), function(key) {
	if(['database', 'username', 'password'].indexOf(key) == -1) {
		options[key] = DB_config[key]
	}
});
var sequelize = new Sequelize(DB_config.database, DB_config.username, DB_config.password, options);
var models = {};

fs.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js')
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file))
		models[model.name] = model
	});

Object.keys(models).forEach(function(modelName) {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models)
	}
});

module.exports = _.extend({
	sequelize: sequelize,
	Sequelize: Sequelize
}, models);