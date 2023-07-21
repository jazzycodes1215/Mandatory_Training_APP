/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('duty', table => {
      table.increments('id').primary();
      table.string('title');
    })
    .createTable('role', table => {
      table.increments('id').primary();
      table.string('role_name');
    })
    .createTable('user', table => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.integer('dodID');
      table.integer('role_id').unsigned();
      table.foreign('role_id').references('role.id');
      table.integer('supervisor_id').unsigned();
      table.foreign('supervisor_id').references('supervisor.id');
      table.integer('training_manager_id').unsigned();
      table.foreign('training_manager_id').references('supervisor.id');
    })
    .createTable('training', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('interval');
      table.string('source', 500);
    })
    .createTable('user_duty', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('user.id');
      table.integer('duty_id').unsigned();
      table.foreign('duty_id').references('duty.id');
    })
    .createTable('duty_training', table => {
      table.increments('id').primary();
      table.integer('duty_id').unsigned();
      table.foreign('duty_id').references('duty.id');
      table.integer('training_id').unsigned();
      table.foreign('training_id').references('training.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('duty_training')
  .dropTableIfExists('user_duty')
  .dropTableIfExists('training')
  .dropTableIfExists('user')
  .dropTableIfExists('role')
  .dropTableIfExists('duty')
};