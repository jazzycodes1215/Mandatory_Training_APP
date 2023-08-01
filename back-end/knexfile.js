// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config()
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.PGADD,
      password: process.env.PGPWD,
      user: process.env.PGUSER,
      port: process.env.PGPORT,
      database: process.env.PGDB
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASESTRING,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
