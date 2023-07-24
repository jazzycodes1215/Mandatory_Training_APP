/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('role').del()
  await knex('role').insert([
    {id: 1, role_name: 'role'},
  ]);
};
