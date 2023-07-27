/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('duty_trainings').del()
  await knex('duty_trainings').insert([
    {id: 1, duty_id: 1, training_id: 1},
    {id: 2, duty_id: 1, training_id: 2},
    {id: 3, duty_id: 1, training_id: 3},
    {id: 4, duty_id: 1, training_id: 4},
    {id: 5, duty_id: 1, training_id: 5},
    {id: 6, duty_id: 1, training_id: 6},
    {id: 7, duty_id: 1, training_id: 7},
    {id: 8, duty_id: 1, training_id: 8},
    {id: 9, duty_id: 1, training_id: 9},
    {id: 10, duty_id: 1, training_id: 10},
    {id: 11, duty_id: 1, training_id: 11},
    {id: 12, duty_id: 1, training_id: 12},
    {id: 13, duty_id: 2, training_id: 23},
    {id: 14, duty_id: 3, training_id: 24},
    {id: 15, duty_id: 4, training_id: 25},
    {id: 16, duty_id: 5, training_id: 26},
    {id: 17, duty_id: 6, training_id: 27},
    {id: 18, duty_id: 7, training_id: 28},
    {id: 19, duty_id: 8, training_id: 13},
    {id: 20, duty_id: 8, training_id: 17},
    {id: 21, duty_id: 9, training_id: 13},
    {id: 22, duty_id: 10, training_id: 13},
    {id: 23, duty_id: 11, training_id: 13},
    {id: 24, duty_id: 12, training_id: 13},
    {id: 25, duty_id: 13, training_id: 13},
    {id: 26, duty_id: 14, training_id: 13},
    {id: 27, duty_id: 15, training_id: 13},
    {id: 28, duty_id: 16, training_id: 13},
    {id: 29, duty_id: 17, training_id: 13},
    {id: 30, duty_id: 18, training_id: 13},
    {id: 31, duty_id: 19, training_id: 13},
    {id: 32, duty_id: 20, training_id: 13},
    {id: 33, duty_id: 21, training_id: 13},
    {id: 34, duty_id: 21, training_id: 16},
  ]);
};
