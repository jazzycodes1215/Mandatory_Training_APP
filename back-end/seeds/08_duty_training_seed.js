/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('duty_training').del()
  await knex('duty_training').insert([
    {id: 1, duty_id: 1, training_id: 1}
  ]);
};
