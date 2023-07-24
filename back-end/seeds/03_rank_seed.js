/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ranks').del()
  await knex('ranks').insert([
    {id: 1, name: 'rank'}
  ]);
};
