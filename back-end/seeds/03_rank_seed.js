/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('rank').del()
  await knex('rank').insert([
    {id: 1, name: 'rank'}
  ]);
};
