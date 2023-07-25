/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {id: 1, role_name: 'Non-verified user'},
    {id: 2, role_name: 'User'},
    {id: 3, role_name: 'Unit Training Manager'},
    {id: 4, role_name: 'Administrator'}
  ]);
};
