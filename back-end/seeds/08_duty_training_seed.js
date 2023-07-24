/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('duty_trainings').del()
  await knex('duty_trainings').insert([
    {id: 1, duty_id: 1, training_id: 1}
  ]);
};
