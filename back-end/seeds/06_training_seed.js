/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('training').del()
  await knex('training').insert([
    {id: 1, name: 'training', interval: 60, source: 'source'}
  ]);
};
