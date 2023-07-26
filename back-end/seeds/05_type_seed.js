/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('type').del()
  await knex('type').insert([
    {id: 1, name: 'Primary Training'},
    {id: 2, name: 'Auxilary Training'},
    {id: 3, name: 'Professional Military Education'},
    {id: 4, name: 'Additional Duty Training'}
  ]);
};
