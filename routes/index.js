var models = require('../models');

module.exports = Routes = {
	index: function(request, response) {
		response.render('index.html');
	},
	api: {
		todos: {
			index: function(request, response) {
				models.Todos.findAll().success(function(todos) {
					response.json({data: todos});
				});
			},
			create: function(request, response) {
				models.Todos.create(request.body).success(function(todo) {
					response.json({data: {id: todo.id }});
				});
			},
			show: function(request, response) {
				models.Todos.find(request.params.id).success(function(todo) {
					response.json({data: todo});
				})
			},
			update: function(request, response) {
				console.log(request.params, request.body);
				models.Todos.update(request.body, {id : request.params.id}).success(function(numRows){
					response.json({});
				});
			},
			destroy: function(request, response) {
				models.Todos.destroy({id: request.params.id}).success(function() {
					response.json({});
				})
			}
		}
	}
};