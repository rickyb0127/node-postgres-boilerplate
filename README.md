# Node Postgres Scaffold
This contains boilerplate code for creating a node api connected to a Postgres database, using Sequelize.

Running dev server

    npm run dev

Create new migration

    npx sequelize-cli migration:generate --name migration-skeleton

Run migration

    npx sequelize-cli db:migrate

Note:
create .env to contain:
ENV
DB_NAME
DB_USER_NAME
DB_PASSWORD

create config/config.json:

    {
	    "development": {
			"username": "postgres",
			"password": "password",
			"database": "database_development",
			"host": "localhost",
			"dialect": "postgres"
		},
		"test": {
			"username": "postgres",
			"password": "password",
			"database": "database_test",
			"host": "localhost",
			"dialect": "postgres"
		},
		"production": {
			"username": "postgres",
			"password": "password",
			"database": "database_production",
			"host": "localhost",
			"dialect": "postgres"
		}
	}