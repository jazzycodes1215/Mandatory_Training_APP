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
<<<<<<< HEAD
      // Generate fake data using Faker
      const numRowsToSeed = 10; // Number of rows you want to insert
      const fakeData = [
          { first_name: "John", last_name: "Doe", rank_id: 19, email: "Admin",  password: bcrypt.hashSync('password', 10), dodID: 123456789, role_id: 4, supervisor_id: 4, unit_id: 1 },
          { first_name: "Joe", last_name: "Schmoe", rank_id: 12, email: "UTM",  password: bcrypt.hashSync('password', 10), dodID: 123456789, role_id: 3, supervisor_id: 1, unit_id: 1 },
          { first_name: "Sally", last_name: "Smith", rank_id: 4, email: "User",  password: bcrypt.hashSync('password', 10), dodID: 123456789, role_id: 2, supervisor_id: 2, unit_id: 1 }
=======
    // Generate fake data using Faker
    const numRowsToSeed = 25; // Number of rows you want to insert
    const fakeData = [
      { first_name: "John", last_name: "Doe", rank_id: 19, email: "Admin",  password: bcrypt.hashSync('password', 10), dodID: 123456789, role_id: 4, supervisor_id: 4, unit_id: 1 },
      { first_name: "Joe", last_name: "Schmoe", rank_id: 12, email: "UTM",  password: bcrypt.hashSync('password', 10), dodID: 123456789, role_id: 3, supervisor_id: 1, unit_id: 1 },
      { first_name: "Sally", last_name: "Smith", rank_id: 4, email: "User",  password: bcrypt.hashSync('password', 10), dodID: 123456789, role_id: 2, supervisor_id: 2, unit_id: 1 },
>>>>>>> main
    ];
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
        role_id: faker.number.int({ min: 1, max: 4 }),
        supervisor_id: faker.number.int({min: 1, max : 6}),
        unit_id: faker.number.int({min: 1, max : 4})
      });
    }
    // Insert the fake data into the table
    return knex('users').insert(fakeData);
  });
};