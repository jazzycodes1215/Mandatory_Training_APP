/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {role_name: 'Non-verified user'},
    {role_name: 'User'},
    {role_name: 'Unit Training Manager'},
    {role_name: 'Administrator'}
  ]);
};
