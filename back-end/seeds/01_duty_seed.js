/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('duty').del()
  await knex('duty').insert([
    {id: 1, title: 'duty'}
  ]);
};
