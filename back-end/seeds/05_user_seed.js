const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, 
    first_name: 'user', 
    last_name:'greatest', 
    rank_id: 1, 
    email:'email', 
    password: bcrypt.hashSync('password', 10),
    dodID: 1609444483,
    role_id: 1,
    supervisor_id: 1,
    unit_id: 1 }
  ]);
};
