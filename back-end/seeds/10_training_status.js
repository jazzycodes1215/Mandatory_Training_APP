/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('training_status').del()
  await knex('training_status').insert([
    {id: 1, user_id: 4, training_id: 1, comment: 'Training complete',read_status: false, submission_date: '2023-07-25T12:00:00Z',completetion_date: '2023-07-30', approval_date: '2023-08-05'},
<<<<<<< HEAD
    {id: 2, user_id: 3, training_id: 1, comment: 'Training requires upload',read_status: false, submission_date: '2023-07-25T12:00:00Z',completetion_date: '2023-07-30', approval_date: '2023-08-05'},
    {id: 3, user_id: 2, training_id: 1, comment: 'Training complete',read_status: false, submission_date: '2023-07-25T12:00:00Z',completetion_date: '2023-07-30', approval_date: '2023-08-05'},
    {id: 4, user_id: 1, training_id: 1, comment: 'Training due',read_status: false, submission_date: '2023-07-25T12:00:00Z',completetion_date: '2023-07-30', approval_date: '2023-08-05'}
=======
    {id: 2, user_id: 3, training_id: 4, comment: 'Training requires upload',read_status: true, submission_date: '2023-07-25T12:00:00Z',completetion_date: '2023-07-30', approval_date: '2023-08-05'},
    {id: 3, user_id: 2, training_id: 3, comment: 'Training complete',read_status: true, submission_date: '2023-07-25T12:00:00Z',completetion_date: '2023-07-30', approval_date: '2023-08-05'},
    {id: 4, user_id: 1, training_id: 2, comment: 'Training due',read_status: false, submission_date: '2023-07-25T12:00:00Z',completetion_date: '2023-07-30', approval_date: '2023-08-05'}
>>>>>>> main
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
//   table.date('completetion_date');
//   table.date('approval_date');