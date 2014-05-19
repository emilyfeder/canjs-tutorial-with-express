module.exports = {
	up: function(migration, DataTypes, done) {
		// add altering commands here, calling 'done' when finished
		migration.addColumn('todos', 'createdAt',
			{
				type: DataTypes.DATE,
				allowNull: false
			}
		);
		migration.addColumn('todos', 'updatedAt',
			{
				type: DataTypes.DATE,
				allowNull: false
			}
		);
		done()
	},
	down: function(migration, DataTypes, done) {
		// add reverting commands here, calling 'done' when finished
		migration.removeColumn('todos', 'createdAt');
		migration.removeColumn('todos', 'updatedAt');
		done()
	}
}
