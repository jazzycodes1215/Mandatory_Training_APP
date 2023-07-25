/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ranks').del()
  await knex('ranks').insert([
    {id: 1, name: 'E-1'},
    {id: 2, name: 'E-2'},
    {id: 3, name: 'E-3'},
    {id: 4, name: 'E-4'},
    {id: 5, name: 'E-5'},
    {id: 6, name: 'E-6'},
    {id: 7, name: 'E-7'},
    {id: 8, name: 'E-8'},
    {id: 9, name: 'E-9'},
    {id: 10, name: 'O-1'},
    {id: 11, name: 'O-2'},
    {id: 12, name: 'O-3'},
    {id: 13, name: 'O-4'},
    {id: 14, name: 'O-5'},
    {id: 15, name: 'O-6'},
    {id: 16, name: 'O-7'},
    {id: 17, name: 'O-8'},
    {id: 18, name: 'O-9'},
    {id: 19, name: 'O-10'}
  ]);
};
