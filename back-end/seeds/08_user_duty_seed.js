/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_duties').del()
  await knex('user_duties').insert([
    {id: 1, user_id: 1, duty_id: 1},
    {id: 2, user_id: 1, duty_id: 2}
  ]);
};
