'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'Had a wonderful time!',
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: 'It was okay, the corn fields were meh...',
        stars: 2
      },
      {
        spotId: 3,
        userId: 2,
        review: 'The botanical gardens were incredible!',
        stars: 5
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Had a wonderful time!', 'It was okay, the corn fields were meh...', 'The botanical gardens were incredible!']}
    }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
