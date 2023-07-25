/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('duties').del()
  await knex('duties').insert([
    {id: 1, title: 'duty'},
    {id: 2, title: 'duty2'}
  ]);
};
