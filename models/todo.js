module.exports = function(sequelize, DataTypes) {
	var attributes = {
		name: DataTypes.STRING,
		complete: DataTypes.BOOLEAN
	};
	var classMethods = {
		freezeTableName: true
	};
	var instanceMethods = {

	};
	return sequelize.define('Todos', attributes, classMethods, instanceMethods);
};