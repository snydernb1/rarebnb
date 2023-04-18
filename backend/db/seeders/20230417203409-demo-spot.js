'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1234 Fun Lane',
        city: 'Boulder',
        state: 'Colorado',
        country: 'United States',
        lat: 40.0150,
        lng: 105.2705,
        name: 'Granola Crunch',
        description: 'Sleeps 4 people and walking distance from Pearl ST.',
        price: 3000
      },
      {
        ownerId: 1,
        address: '1234 Corn St',
        city: 'Logan',
        state: 'Ohio',
        country: 'United States',
        lat: 39.4335,
        lng: 82.5482,
        name: 'Corn Fields',
        description: 'Sleeps 6 people and walking distance to corn maze.',
        price: 400
      },
      {
        ownerId: 2,
        address: '1234 Park St',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'United States',
        lat: 33.7488,
        lng: 84.3877,
        name: 'City Hive',
        description: 'Sleeps 4 people and walking distance to Piedmont Park.',
        price: 1000
      }
    ], {})
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Granola Crunch', 'Corn Fields', 'City Hive']}
    }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
