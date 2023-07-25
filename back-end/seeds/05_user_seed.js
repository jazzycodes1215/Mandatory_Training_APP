const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries for the table
  return knex('users').del()
  .then(function () {
      // Generate fake data using Faker
      const numRowsToSeed = 10; // Number of rows you want to insert
      const fakeData = [];
      for (let i = 0; i < numRowsToSeed; i++) {
          let first_name = faker.person.firstName();
          let last_name = faker.person.lastName();
      fakeData.push({
          first_name: `${first_name}`,
          last_name: `${last_name}`,
          rank_id: faker.number.int({ min: 1, max: 19 }),
          email: faker.internet.email({ firstName: first_name, lastName: last_name }),
          password: bcrypt.hashSync('password', 10),
          dodID: faker.finance.accountNumber({ length: 9 }),
          role_id: faker.number.int({ min: 2, max: 4 }),
          supervisor_id: faker.number.int({ min: 1, max: numRowsToSeed }),
          unit_id: 1
      });
      }
      // Insert the fake data into the table
      return knex('users').insert(fakeData);
  });
};