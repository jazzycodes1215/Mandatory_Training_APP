/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units').del()
  await knex('units').insert([
    {id: 0, name: '1 SOPS'},
    {id: 1, name: '2 SOPS'},
    {id: 2, name: '3 SOPS'},
    {id: 3, name: '4 SOPS'}
  ]);
};
