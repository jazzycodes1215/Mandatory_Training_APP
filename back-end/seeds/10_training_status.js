/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('training_status').del()
  await knex('training_status').insert([
    {id: 1, user_id: 1, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 2, user_id: 1, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {id: 3, user_id: 1, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2022-07-25T12:00:00Z', completion_date: '2022-07-24', approval_date: '2022-07-26'},
    {id: 4, user_id: 1, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2022-01-25T12:00:00Z', completion_date: '2022-01-24', approval_date: '2022-01-26'},
    {id: 5, user_id: 1, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 6, user_id: 1, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {id: 7, user_id: 1, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2022-07-25T12:00:00Z', completion_date: '2022-07-24', approval_date: '2022-07-26'},
    {id: 8, user_id: 1, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2022-01-25T12:00:00Z', completion_date: '2021-01-24', approval_date: '2022-01-26'},
    {id: 9, user_id: 1, training_id: 3, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 10, user_id: 1, training_id: 3, comment: 'Completed', read_status: true, submission_date: '2022-07-25T12:00:00Z', completion_date: '2022-07-24', approval_date: '2022-07-26'},
    {id: 11, user_id: 1, training_id: 4, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 12, user_id: 1, training_id: 4, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {id: 13, user_id: 1, training_id: 4, comment: 'Completed', read_status: true, submission_date: '2022-07-25T12:00:00Z', completion_date: '2022-07-24', approval_date: '2022-07-26'},
    {id: 14, user_id: 1, training_id: 4, comment: 'Completed', read_status: true, submission_date: '2022-01-25T12:00:00Z', completion_date: '2022-01-24', approval_date: '2022-01-26'},
    {id: 15, user_id: 1, training_id: 7, comment: 'Completed', read_status: true, submission_date: '2023-03-25T12:00:00Z', completion_date: '2023-03-24', approval_date: '2023-03-26'},
    {id: 16, user_id: 1, training_id: 8, comment: 'Completed', read_status: true, submission_date: '2022-05-25T12:00:00Z', completion_date: '2022-05-24', approval_date: '2022-05-26'},
    {id: 17, user_id: 2, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 18, user_id: 2, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {id: 19, user_id: 3, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 20, user_id: 3, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {id: 21, user_id: 3, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 22, user_id: 3, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {id: 23, user_id: 4, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 24, user_id: 4, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {id: 25, user_id: 1, training_id: 9, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 26, user_id: 1, training_id: 10, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 27, user_id: 1, training_id: 11, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 28, user_id: 1, training_id: 12, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 29, user_id: 1, training_id: 13, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 30, user_id: 1, training_id: 14, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 31, user_id: 1, training_id: 15, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 32, user_id: 1, training_id: 16, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 33, user_id: 1, training_id: 17, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 34, user_id: 1, training_id: 18, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 35, user_id: 1, training_id: 19, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 36, user_id: 1, training_id: 20, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 37, user_id: 1, training_id: 21, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 38, user_id: 1, training_id: 22, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 39, user_id: 1, training_id: 23, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 40, user_id: 1, training_id: 24, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 41, user_id: 1, training_id: 25, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 42, user_id: 1, training_id: 26, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'},
    {id: 43, user_id: 1, training_id: 27, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-26'}
  ]);
};




// .createTable('training_status', table => {
//   table.increments('id').primary();
//   table.integer('user_id').unsigned();
//   table.foreign('user_id').references('users.id');
//   table.integer('training_id').unsigned();
//   table.foreign('training_id').references('trainings.id');
//   table.string('comment');
//   table.boolean('read_status');
//   table.datetime('submission_date');
//   table.date('completion_date');
//   table.date('approval_date');