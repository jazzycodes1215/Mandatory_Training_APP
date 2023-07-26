/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.up = function(knex) {
    return knex.schema
    .createTable('duties', table => {
        table.increments('id').primary();
        table.string('title');
    })
    .createTable('roles', table => {
        table.increments('id').primary();
        table.string('role_name');
    })
    .createTable('ranks', table => {
        table.increments('id').primary();
        table.string('name');
    })
    .createTable('units', table => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.integer('rank_id').unsigned();
      table.foreign('rank_id').references('ranks.id');
      table.string('email');
      table.string('password');
      table.integer('dodID');
      table.integer('role_id').unsigned();
      table.foreign('role_id').references('roles.id');
      table.integer('supervisor_id');
      table.integer('unit_id').unsigned();
      table.foreign('unit_id').references('units.id');
    })
    .createTable('trainings', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('interval');
      table.string('source', 500);
    })
    .createTable('user_duties', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('duty_id').unsigned();
      table.foreign('duty_id').references('duties.id');
    })
    .createTable('duty_trainings', table => {
      table.increments('id').primary();
      table.integer('duty_id').unsigned();
      table.foreign('duty_id').references('duties.id');
      table.integer('training_id').unsigned();
      table.foreign('training_id').references('trainings.id');
    })
    .createTable('training_status', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.integer('training_id').unsigned();
      table.foreign('training_id').references('trainings.id');
      table.string('comment');
      table.boolean('read_status');
      table.datetime('submission_date');
      table.date('completetion_date');
      table.date('approval_date');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('training_status')
  .dropTableIfExists('duty_trainings')
  .dropTableIfExists('user_duties')
  .dropTableIfExists('trainings')
  .dropTableIfExists('users')
  .dropTableIfExists('units')
  .dropTableIfExists('ranks')
  .dropTableIfExists('roles')
  .dropTableIfExists('duties')
};