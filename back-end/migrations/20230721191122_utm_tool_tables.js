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
    .createTable('type', table => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.integer('rank_id').unsigned();
      table.foreign('rank_id').references('ranks.id').onDelete('CASCADE');
      table.string('email');
      table.string('password');
      table.integer('dodID');
      table.integer('role_id').unsigned();
      table.foreign('role_id').references('roles.id').onDelete('CASCADE');;
      table.integer('supervisor_id');
      table.integer('unit_id').unsigned();
      table.foreign('unit_id').references('units.id').onDelete('CASCADE');;
    })
    .createTable('trainings', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('interval');
      table.string('source', 500);
      table.integer('type_id').unsigned();
      table.foreign('type_id').references('type.id').onDelete('CASCADE');;
    })
    .createTable('user_duties', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');;
      table.integer('duty_id').unsigned();
      table.foreign('duty_id').references('duties.id').onDelete('CASCADE');;
    })
    .createTable('duty_trainings', table => {
      table.increments('id').primary();
      table.integer('duty_id').unsigned();
      table.foreign('duty_id').references('duties.id').onDelete('CASCADE');;
      table.integer('training_id').unsigned();
      table.foreign('training_id').references('trainings.id').onDelete('CASCADE');;
    })
    .createTable('training_status', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');;
      table.integer('training_id').unsigned();
      table.foreign('training_id').references('trainings.id').onDelete('CASCADE');;
      table.string('comment');
      table.boolean('read_status');
      table.datetime('submission_date');
      table.date('completion_date');
      table.date('approval_date');
    })
    .createTable('files', table => {
      table.increments('id').primary();
      table.string('file_name').notNullable;
      table.binary('file_content').notNullable;
      table.string('file_type');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
    .createTable('tickets', table => {
      table.increments('id').primary();
      table.string('description');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('training_id').unsigned();
      table.foreign('training_id').references('trainings.id').onDelete('CASCADE')
      table.bool("ticketclosed").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('tickets')
  .dropTableIfExists('files')
  .dropTableIfExists('training_status')
  .dropTableIfExists('duty_trainings')
  .dropTableIfExists('user_duties')
  .dropTableIfExists('trainings')
  .dropTableIfExists('users')
  .dropTableIfExists('units')
  .dropTableIfExists('type')
  .dropTableIfExists('ranks')
  .dropTableIfExists('roles')
  .dropTableIfExists('duties')
};