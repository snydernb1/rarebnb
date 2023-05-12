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
        address: '1234 Lux Lane',
        city: 'Cape Town',
        state: 'Western Cape',
        country: 'South Africa',
        lat: 40.0150,
        lng: 105.2705,
        name: 'Villa Sierra',
        description: `Minutes from Cape Town’s hottest attractions, this secluded mountain villa offers the perfect escape for those who prefer privacy.`,
        price: 740
      },
      {
        ownerId: 1,
        address: '1234 Mountain St',
        city: 'Telluride',
        state: 'Colorado',
        country: 'United States',
        lat: 39.4335,
        lng: 82.5482,
        name: 'Sunset Ridge',
        description: `A gentle stream feeds into the placid pond surrounding this designer mountain estate with panoramic views of the San Juan Mountains.`,
        price: 13333
      },
      {
        ownerId: 2,
        address: '1234 Park St',
        city: 'Wilson',
        state: 'Wyoming',
        country: 'United States',
        lat: 33.7488,
        lng: 84.3877,
        name: 'Four Pines 8',
        description: `Just three minutes from Jackson Hole Mountain Resort, this luxuriously appointed four bedroom is the perfect home base for year-round mountain exploration.`,
        price: 2731
      },
      {
        ownerId: 3,
        address: '1234 Right St',
        city: 'Gardone Riviera',
        state: 'Lombardia',
        country: 'Italy',
        lat: 33.7488,
        lng: 84.3877,
        name: 'Villa David Chipperfield Nord',
        description: `Architect David Chipperfield designed the airy interiors of this classic pergola-style house to celebrate the breathtaking surroundings of Lake Garda.`,
        price: 10937
      },
      {
        ownerId: 7,
        address: '1234 Fancy St',
        city: ' Lagos',
        state: 'Canavial',
        country: 'Portugal',
        lat: 33.7488,
        lng: 84.3877,
        name: 'Lux Mare I',
        description: `Set over two levels of palatial splendor, this villa offers a breathtaking view of the Algarve coast and the shining Atlantic beyond.`,
        price: 2051
      },
      {
        ownerId: 6,
        address: '1234 Greece St',
        city: 'Chania',
        state: 'Crete',
        country: 'Greece',
        lat: 33.7488,
        lng: 84.3877,
        name: 'Villa Saint Antoine',
        description: `Villa Saint Antoine is a fabulous modern home on the Greek island of Crete, about eight kilometers northeast of Chania.`,
        price: 1205
      },
      {
        ownerId: 2,
        address: '1234 Beach St',
        city: 'Naples',
        state: 'Florida',
        country: 'United States',
        lat: 33.7488,
        lng: 84.3877,
        name: 'Moorings Villa Naples',
        description: 'Soaring palm trees and a manicured garden lead the way to this Naples, Florida mansion. Views of the glistening bay stretch beyond the backyard. The elegant interior features sumptuous décor and an airy ambiance.',
        price: 1500
      },
      {
        ownerId: 5,
        address: '1234 Desert St',
        city: 'Joshua Tree',
        state: 'California',
        country: 'United States',
        lat: 33.7488,
        lng: 84.3877,
        name: 'The Kellogg Doolittle House',
        description: `This is the famous Kellogg Doolittle estate in Joshua Tree California. It is one of the most exclusive homes in the world, and available for the first time as an Airbnb Luxe exclusive.`,
        price: 5150
      },
      {
        ownerId: 4,
        address: '1234 South St',
        city: 'Mooresville',
        state: 'North Carolina',
        country: 'United States',
        lat: 33.7488,
        lng: 84.3877,
        name: 'Hidden Harbor',
        description: `This oasis is tucked away in the trees on picturesque Lake Norman. The open-concept interior features ample space for the whole gang to spread out.`,
        price: 1256
      },
      {
        ownerId: 5,
        address: '1214 Desert St',
        city: 'Topanga',
        state: 'California',
        country: 'United States',
        lat: 33.7488,
        lng: 84.3877,
        name: 'Saddle Peak',
        description: `Located in the boho heart of Los Angeles, this secluded home is surrounded by nothing but wild, wide-open space.`,
        price: 1296
      },
      {
        ownerId: 3,
        address: '2214 Beach Ln',
        city: 'Cabo San Lucas',
        state: 'Baja California Sur',
        country: 'Mexico',
        lat: 33.7488,
        lng: 84.3877,
        name: 'West Enclave 7',
        description: `Loungers wait on the white-sand beach beyond the warm sandstone walls of this contemporary home on the Sea of Cortez.`,
        price: 5951
      },
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
