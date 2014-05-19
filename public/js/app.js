var App = {};

App.getApiUrl = function(path, method) {
	return method + ' ' + Config.data_api.url + path;
};

$(document).ready(function() {
	/*var todos = new can.List([
		{name: "Walk the dog", completed: true},
		{name: "mow the lawn", completed: false},
		{name: "learn CanJS", completed: false}
	]);*/

	can.Component.extend({
		tag: "todos-list",
		template: can.view("todos-list-template"),
		scope: {
			editTodo: function(todo) {
				todo.attr('editing', true);
			},
			updateTodo: function(todo, el) {
				todo.removeAttr('editing');
				todo.attr('name', el.val());
				todo.save();
			}
		}
	});

	can.Component.extend({
		tag: "todos-app",
		scope: {
			todos: new App.Todo.List({}),
			displayedTodos: function() {
				var filter = can.route.attr('filter');
				var todos = this.attr('todos');

				if (filter === 'active') {
					return todos.active();
				}
				else if (filter === 'completed') {
					return todos.completed();
				}
				return todos;
			},
			createTodo: function(context, el, ev) {
				if( el.val()){
					var newTodo = new App.Todo({
						complete: false,
						name: el.val()
					})
					newTodo.save();
					el.val("");
					this.attr('todos').push(newTodo)
				}
			},
			clearCompleted: function(context, el, ev) {
				this.attr('todos').deleteCompleted();
			}
		},
		helpers: {
			filterLink: function(text, filterVal) {
				return can.route.link(
					text,
					{filter: filterVal },
					{
						className: can.route.attr("filter") == filterVal ? "selected" : ""
					}
				);
			},
			plural: function(singular, count) {
				var value = count(); //count is a compute
				if(value == 1) return singular;
				else return singular + "s";
			}
		}
	});

	can.route(":filter");
	can.route.ready();
	var frag = can.view('app-template', {});
	$('#app-content').html(frag);
});