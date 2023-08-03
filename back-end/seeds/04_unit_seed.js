/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units').del()
  await knex('units').insert([
    {name: '1 SOPS'},
    {name: '2 SOPS'},
    {name: '3 SOPS'},
    {name: '4 SOPS'}
  ]);
};
