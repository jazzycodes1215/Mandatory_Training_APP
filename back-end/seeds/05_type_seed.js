/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('type').del()
  await knex('type').insert([
    {name: 'Primary Training'},
    {name: 'Auxilary Training'},
    {name: 'Professional Military Education'},
    {name: 'Additional Duty Training'}
  ]);
};
