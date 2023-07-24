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
    .createTable('rank', table => {
        table.increments('id').primary();
        table.string('name');
    })
    .createTable('unit', table => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('user', table => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.integer('rank_id').unsigned();
      table.foreign('rank_id').references('rank.id');
      table.string('email');
      table.string('password');
      table.integer('dodID');
      table.integer('role_id').unsigned();
      table.foreign('role_id').references('role.id');
      table.integer('supervisor_id');
      table.integer('unit_id').unsigned();
      table.foreign('unit_id').references('unit.id');
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
  .dropTableIfExists('unit')
  .dropTableIfExists('rank')
  .dropTableIfExists('role')
  .dropTableIfExists('duty')
};