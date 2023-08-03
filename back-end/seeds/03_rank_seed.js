/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ranks').del()
  await knex('ranks').insert([
    {name: 'E-1'},
    {name: 'E-2'},
    {name: 'E-3'},
    {name: 'E-4'},
    {name: 'E-5'},
    {name: 'E-6'},
    {name: 'E-7'},
    {name: 'E-8'},
    {name: 'E-9'},
    {name: 'O-1'},
    {name: 'O-2'},
    {name: 'O-3'},
    {name: 'O-4'},
    {name: 'O-5'},
    {name: 'O-6'},
    {name: 'O-7'},
    {name: 'O-8'},
    {name: 'O-9'},
    {name: 'O-10'}
  ]);
};
