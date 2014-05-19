/*
To set up your own app, you will need to fill in these options depending on what server you want.
If you use a different database engine, you will need to install its package. I.E.
npm install mysql # to use mysql
Then rename this file config.js, and everything should work.
 */
module.exports = {
	development: {
		username: "username",
		password: "password",
		database: "canjs_tutorial",
		host: null,
		dialect: "mariadb",
		dialectOptions: {
			unixSocket: "/opt/local/var/run/mariadb/mysqld.sock" //where macports installs mariadb
		}
	}

}