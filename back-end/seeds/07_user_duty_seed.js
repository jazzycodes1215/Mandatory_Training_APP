/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_duty').del()
  await knex('user_duty').insert([
    {id: 1, user_id: 1, duty_id: 1}
  ]);
};
