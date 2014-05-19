##CanJs-Tutorial (With an Express Server)
The purpose of this project was to implement the canjs tutorial as seen here:
http://www.youtube.com/watch?v=E9kEM9P0Lp8.

But instead of using can.fixture to represent the server, I wanted to set up an actual server.
To do this, I put all the javascript that the tutorial asks you to write into the public/ folder.
Then I set up an express app to serve index.html as static content at localhost:4000/. The server also serves
the json api used for the canjs models.


###Installation and Usage
- First, git clone this repository.
- Install MariaDB as shown below (for a mac). If you want to use a different db, you'll still have to figure out how to get the
process started and the connection options required for third-party apps. You'll also have to install the node
database adapter, which will allow sequelize to talk to your database. For example to use mariadb, I installed mariasql.
- Rename config/config_sanitized.js to config/config.js and set the options to use your new database connection.
- Run the migrations to initialize the database schema

###Installing MariaDB on a Mac

I used macports to do this. I just wanted to repeat my steps for future reference:

    sudo port install mariadb-server
    # to start the db server immediately upon reboot:
    sudo launchctl load -w /Library/LaunchDaemons/org.macports.mariadb-server.plist
    /opt/local/lib/mariadb/bin/mysqladmin -u root password 123456

To connect via third party apps such as sequel pro or through sequelize, I was unable to connect through 127.0.0.1.
However, because mariadb has been installed locally, can use the socket at `/opt/local/var/run/mariadb/mysqld.sock`
If you still see errors, then try editing the configuration file to include:

    # /opt/local/etc/mariadb/my.cnf
	# ... other stuff
	#
	[mysqld]
	#skip-networking
	socket=/opt/local/var/run/mariadb/mysqld.sock

###Running migrations using sequelize:
See their documentation here: http://sequelizejs.com/docs/latest/migrations.
To initialize the database, execute this:

    #from the project root
    node_modules/sequelize/bin/sequelize -m --config config/config.js

###Issues
I wasn't a fan of the fact that the model definition is so spread out. I used sequelize migrations, which is great for
creating a new server instance, but that was one place to define the schema. I also had to define the models for sequelize.
Then I had to define the rest api to talk to the models. Finally, I had to define the canjs models (in public/models).
However, the canjs models are pretty lightweight and don't require you to redefine the schema.

Another issue is that canjs forces you to use a restful api to talk to your
database, which may not be the best option for more complex apps. It does add a nice abstraction layer, however, so that changing
 the models server-side is less likely to affect the client's conception of the models and vice versa. However, it does mean that
 as a designer you have to remember how both work anyway.

 Finally, while sequelize is a great tool for bootstrapping a new app, I would not recommend it for existing databases as it is very
 hard to work around their table and column naming conventions. I think overall it is not flexible enough for a number of different
 tasks, and I found it rather clumsy after coming from Ruby on Rails/ActiveRecord land. Migrations are a great idea, but still
 young. As I said before, it is hard to use custom table names when defining sequelize models, but their conventions are not
 enforced at the migration level, so I found myself having to rename some columns via later migrations.