// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config({ path: './../.env' })

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


  staging: {
    client: 'postgresql',
    connection: process.env.DATABASESTRING,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
