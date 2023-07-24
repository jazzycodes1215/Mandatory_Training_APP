/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('unit').del()
  await knex('unit').insert([
    {id: 1, name: 'unit'}
  ]);
};
