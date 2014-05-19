module.exports = {
	up: function(migration, DataTypes, done) {
		// add altering commands here, calling 'done' when finished
		migration.changeColumn(
			'todos',
			'complete',
			{
				type: DataTypes.BOOLEAN,
				allowNull: false,
				default: false
			}
		);
		done()
	},
	down: function(migration, DataTypes, done) {
		// add reverting commands here, calling 'done' when finished
		migration.changeColumn(
			'todos',
			'complete',
			{
				type: DataTypes.BOOLEAN,
				allowNull: false
			}
		);
		done()
	}
}
