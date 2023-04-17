'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-02-16',
        endDate: '2022-02-19'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2022-02-14',
        endDate: '2022-02-19'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2022-02-23',
        endDate: '2022-02-28'
      }

    ], {});
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2022-02-16', '2022-02-14', '2022-02-23']}
    }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
