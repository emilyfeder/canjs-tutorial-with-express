App.Todo = can.Model.extend({
	findAll: App.getApiUrl('/todos', 'GET'),
	findOne: App.getApiUrl('/todos/{id}', 'GET'),
	create:  App.getApiUrl('/todos', 'POST'),
	update:  App.getApiUrl('/todos/{id}', 'PUT'),
	destroy: App.getApiUrl('/todos/{id}', 'DELETE')
}, {

});

App.Todo.List = App.Todo.List.extend({
	filter: function(should_keep) {
		var list = new this.constructor;
		this.each(function(todo) {
			if (should_keep(todo)) list.push(todo);
		});
		return list;
	},
	active: function() {
		return this.filter(function(todo) {
			return !todo.attr('complete');
		});
	},
	activeCount: function() {
		return this.active().attr('length');
	},
	completed: function() {
		return this.filter(function(todo) {
			return todo.attr('complete');
		});
	},
	completedCount: function() {
		return this.completed().attr('length');
	},
	deleteCompleted: function() {
		this.completed().each(function(todo) {
			todo.destroy();
		});
	}
})