/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_duties').del()
  await knex('user_duties').insert([
    {user_id: 1, duty_id: 1},
    {user_id: 1, duty_id: 2},
    {user_id: 1, duty_id: 3},
    {user_id: 1, duty_id: 4},
    {user_id: 1, duty_id: 5},
    {user_id: 1, duty_id: 6},
    {user_id: 1, duty_id: 7},
    {user_id: 1, duty_id: 8},
    {user_id: 1, duty_id: 9},
    {user_id: 1, duty_id: 10},
    {user_id: 1, duty_id: 11},
    {user_id: 1, duty_id: 12},
    {user_id: 1, duty_id: 13},
    {user_id: 1, duty_id: 14},
    {user_id: 1, duty_id: 15},
    {user_id: 1, duty_id: 16},
    {user_id: 1, duty_id: 17},
    {user_id: 1, duty_id: 18},
    {user_id: 1, duty_id: 19},
    {user_id: 1, duty_id: 20},
    {user_id: 1, duty_id: 21},
    {user_id: 2, duty_id: 2},
    {user_id: 2, duty_id: 3},
    {user_id: 2, duty_id: 4},
    {user_id: 2, duty_id: 5},
    {user_id: 2, duty_id: 6},
    {user_id: 2, duty_id: 7},
    {user_id: 2, duty_id: 8},
    {user_id: 2, duty_id: 9},
    {user_id: 2, duty_id: 1},
    {user_id: 3, duty_id: 1},
    {user_id: 3, duty_id: 2},
    {user_id: 4, duty_id: 1},
    {user_id: 5, duty_id: 1},
    {user_id: 6, duty_id: 1},
    {user_id: 7, duty_id: 1},
    {user_id: 8, duty_id: 1},
    {user_id: 9, duty_id: 1},
    {user_id: 10, duty_id: 1},
    {user_id: 11, duty_id: 1},
    {user_id: 12, duty_id: 1}
  ]);
};
