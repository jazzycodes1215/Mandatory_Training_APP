/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('trainings').del()
  await knex('trainings').insert([
    {id: 1, name: 'training', interval: 60, source: 'source', type_id: 1}
  ]);
};
