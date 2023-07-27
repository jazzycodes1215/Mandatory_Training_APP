/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_duties').del()
  await knex('user_duties').insert([
    {id: 1, user_id: 1, duty_id: 1},
    {id: 2, user_id: 1, duty_id: 2},
    {id: 3, user_id: 1, duty_id: 3},
    {id: 4, user_id: 1, duty_id: 4},
    {id: 5, user_id: 1, duty_id: 5},
    {id: 6, user_id: 1, duty_id: 6},
    {id: 7, user_id: 1, duty_id: 7},
    {id: 8, user_id: 1, duty_id: 8},
    {id: 9, user_id: 1, duty_id: 9},
    {id: 10, user_id: 1, duty_id: 10},
    {id: 11, user_id: 1, duty_id: 11},
    {id: 12, user_id: 1, duty_id: 12},
    {id: 13, user_id: 1, duty_id: 13},
    {id: 14, user_id: 1, duty_id: 14},
    {id: 15, user_id: 1, duty_id: 15},
    {id: 16, user_id: 1, duty_id: 16},
    {id: 17, user_id: 1, duty_id: 17},
    {id: 18, user_id: 1, duty_id: 18},
    {id: 19, user_id: 1, duty_id: 19},
    {id: 20, user_id: 1, duty_id: 20},
    {id: 21, user_id: 1, duty_id: 21},
    {id: 22, user_id: 2, duty_id: 2},
    {id: 23, user_id: 2, duty_id: 3},
    {id: 24, user_id: 2, duty_id: 4},
    {id: 25, user_id: 2, duty_id: 5},
    {id: 26, user_id: 2, duty_id: 6},
    {id: 27, user_id: 2, duty_id: 7},
    {id: 28, user_id: 2, duty_id: 8},
    {id: 29, user_id: 2, duty_id: 9},
    {id: 30, user_id: 2, duty_id: 1},
    {id: 31, user_id: 3, duty_id: 1},
    {id: 32, user_id: 3, duty_id: 2},
    {id: 33, user_id: 4, duty_id: 1},
    {id: 34, user_id: 5, duty_id: 1},
    {id: 35, user_id: 6, duty_id: 1},
    {id: 36, user_id: 7, duty_id: 1},
    {id: 37, user_id: 8, duty_id: 1},
    {id: 38, user_id: 9, duty_id: 1},
    {id: 39, user_id: 10, duty_id: 1},
    {id: 40, user_id: 11, duty_id: 1},
    {id: 41, user_id: 12, duty_id: 1}
  ]);
};
