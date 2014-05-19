process.env.NODE_ENV = process.env.NODE_ENV || 'development';
DB_config = require('./config/config.js')[process.env.NODE_ENV];
var   express = require('express')
	, bodyparser = require('body-parser')
	, compress = require('compression')
	, http    = require('http')
	, path    = require('path')
	, models  = require('./models')
	, routes  = require('./routes')

var app = express()

app.set('env', process.env.NODE_ENV);
app.set('port', 4000);

//middleware/plugins
app.use(bodyparser());
app.use(compress());
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

app.get('/', routes.index);
app.get('/api/todos', routes.api.todos.index);
app.post('/api/todos', routes.api.todos.create);
app.get('/api/todos/:id', routes.api.todos.show);
app.put('/api/todos/:id', routes.api.todos.update);
app.del('/api/todos/:id', routes.api.todos.destroy);

models.sequelize.authenticate().complete(function(err) {
	if(err) throw err;
	else {
		http.createServer(app).listen(app.get('port'), function() {
			console.log("Server listening on port " + app.get('port'));
		});
	}
})


