'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'John',
        lastName: 'Doe',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Jane',
        lastName: 'Snow',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Jonny',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: 'James',
        lastName: 'Williams',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        firstName: 'Susan',
        lastName: 'Turner',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        firstName: 'Mary',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        firstName: 'Erika',
        lastName: 'Davis',
        hashedPassword: bcrypt.hashSync('password2')
      },
    ], {}); //what is empty object here for?
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2']}
    }, {})

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
