/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('training_status').del()
  await knex('training_status').insert([
    {user_id: 1, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-01', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {user_id: 1, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2022-07-25T12:00:00Z', completion_date: '2022-07-24', approval_date: '2022-07-26'},
    {user_id: 1, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2022-01-25T12:00:00Z', completion_date: '2022-01-24', approval_date: '2022-01-26'},
    {user_id: 1, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-02', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {user_id: 1, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2022-07-25T12:00:00Z', completion_date: '2022-07-24', approval_date: '2022-07-26'},
    {user_id: 1, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2022-01-25T12:00:00Z', completion_date: '2021-01-24', approval_date: '2022-01-26'},
    {user_id: 1, training_id: 3, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-03', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 3, comment: 'Completed', read_status: true, submission_date: '2022-07-25T12:00:00Z', completion_date: '2022-07-24', approval_date: '2022-07-26'},
    {user_id: 1, training_id: 4, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-04', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 4, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {user_id: 1, training_id: 4, comment: 'Completed', read_status: true, submission_date: '2022-07-25T12:00:00Z', completion_date: '2022-07-24', approval_date: '2022-07-26'},
    {user_id: 1, training_id: 4, comment: 'Completed', read_status: true, submission_date: '2022-01-25T12:00:00Z', completion_date: '2022-01-24', approval_date: '2022-01-26'},
    {user_id: 1, training_id: 4, comment: 'Completed', read_status: true, submission_date: '2023-03-25T12:00:00Z', completion_date: '2023-03-24', approval_date: '2023-03-26'},
    {user_id: 1, training_id: 8, comment: 'Completed', read_status: true, submission_date: '2021-05-25T12:00:00Z', completion_date: '2022-05-24', approval_date: '2022-05-26'},
    {user_id: 2, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-05', approval_date: '2023-07-31'},
    {user_id: 2, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {user_id: 3, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-06', approval_date: '2023-07-31'},
    {user_id: 3, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {user_id: 3, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-07', approval_date: '2023-07-31'},
    {user_id: 3, training_id: 2, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {user_id: 4, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-08', approval_date: '2023-07-31'},
    {user_id: 4, training_id: 1, comment: 'Completed', read_status: true, submission_date: '2023-01-25T12:00:00Z', completion_date: '2023-01-24', approval_date: '2023-01-26'},
    {user_id: 1, training_id: 9, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-09', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 10, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-10', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 11, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-11', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 12, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-12', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 13, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-13', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 14, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-14', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 15, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-15', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 16, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-16', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 17, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-17', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 18, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-18', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 19, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-19', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 20, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-20', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 21, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-21', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 22, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-22', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 23, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-23', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 24, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-24', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 25, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-25', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 26, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-26', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 27, comment: 'Completed', read_status: true, submission_date: '2023-07-25T12:00:00Z', completion_date: '2023-07-27', approval_date: '2023-07-31'},
    {user_id: 1, training_id: 5, comment: 'Completed', read_status: true, submission_date: '2022-08-25T12:00:00Z', completion_date: '2022-08-27', approval_date: '2022-08-31'},
    {user_id: 1, training_id: 6, comment: 'Completed', read_status: true, submission_date: '2022-09-25T12:00:00Z', completion_date: '2022-09-27', approval_date: '2022-09-30'},
    {user_id: 1, training_id: 28, comment: 'Completed', read_status: true, submission_date: '2022-07-25T12:00:00Z', completion_date: '2022-07-27', approval_date: '2022-07-30'}
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