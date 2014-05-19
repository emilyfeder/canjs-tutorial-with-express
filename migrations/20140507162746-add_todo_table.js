module.exports = {
	up: function(migration, DataTypes, done) {
		// add altering commands here, calling 'done' when finished
		migration.createTable('todos', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING
			},
			complete: {
				type: DataTypes.BOOLEAN
			}
		})
			done()
	},
	down: function(migration, DataTypes, done) {
		// add reverting commands here, calling 'done' when finished
		migration.dropTable('todos');
		done()
	}
}
