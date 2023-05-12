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
        description: `Minutes from Cape Town’s hottest attractions, this secluded mountain villa offers the perfect escape for those who prefer privacy. Spread across 4-stories, with beautiful indoor/outdoor entertaining areas, there’s no shortage of inspiring mountain views. Spend hot days by the pool. When the sun sets, throw a couple of logs on the fire and sip locally crafted wine under the stars.`,
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
        description: `A gentle stream feeds into the placid pond surrounding this designer mountain estate with panoramic views of the San Juan Mountains. Take a glass of vino across a foot bridge and sip around the sunken fire pit, or head inside the soaring interiors to admire the wild beauty of the West through floor-to-ceiling glass walls. You’re minutes from the slopes, with the Alta Lakes a short drive further.`,
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
        description: `Just three minutes from Jackson Hole Mountain Resort, this luxuriously appointed four bedroom is the perfect home base for year-round mountain exploration. With world-class skiing in the winter, and golf and hiking in the summer, Wilson, Wyoming is an excellent source of scenic adventure tourism. Nearby, you’ll find the town of Jackson, Teton Village, and Yellowstone National Park.`,
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
        description: `Architect David Chipperfield designed the airy interiors of this classic pergola-style house to celebrate the breathtaking surroundings of Lake Garda. From this prestigious position on the Eden Luxury Resort, you’ll enjoy endless views of the lake, as well as easy access to walking and biking trails. After a day on the lake, cool off in the pool or grab a drink at Eden’s gourmet restaurant.`,
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
        description: `Set over two levels of palatial splendor, this villa offers a breathtaking view of the Algarve coast and the shining Atlantic beyond. A truly magnificent poolside terrace lets guests enjoy Algarve mornings with peace and serenity assured. With room after room of spacious, considered design, this villa provides smart outfitting and deep comfort, plus the charm of nearby Lagos and numerous hidden beaches.`,
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
        description: `Villa Saint Antoine is a fabulous modern home on the Greek island of Crete, about eight kilometers northeast of Chania. Enjoying a hillside vantage with sweeping views of Souda Bay, the three-story masterwork offers a graceful fusion of indoor and outdoor living, including a wrap-around terrace with infinity swimming pool and alfresco dining. A variety of high-end amenities will meet your desires and needs, including a sauna, exercise room, home office, excellent media features, and a gourmet kitchen. Five comfortable bedrooms with ensuite bathrooms offer ideal accommodations for families and groups of friends up to ten in size.`,
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
        description: 'Soaring palm trees and a manicured garden lead the way to this Naples, Florida mansion. Views of the glistening bay stretch beyond the backyard. The elegant interior features sumptuous décor and an airy ambiance. Explore the area, hopping between posh boutiques, quaint cafés, and waterfront eateries. Pristine golf courses sprawl nearby. Champagne is the perfect accompaniment to the vivid sunset.',
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
        description: `This oasis is tucked away in the trees on picturesque Lake Norman. The open-concept interior features ample space for the whole gang to spread out. A screened-in deck is the perfect place to savor an al fresco meal with a fresh breeze and the hum of nature. Vintage lights glow in the twilight as you soak in the hot tub. A games room keeps the fun rolling. Take the kayaks for a peaceful paddle.`,
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
        description: `Located in the boho heart of Los Angeles, this secluded home is surrounded by nothing but wild, wide-open space. The ultra modern structure, perched at the edge of a lush escarpment, features an unimpeded view of the rugged countryside from its abundance of full-length windows. The iconic Santa Monica Pier and sprawling seaside at Venice Beach, as well as The Getty Villa, are a short drive away.`,
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
        description: `Loungers wait on the white-sand beach beyond the warm sandstone walls of this contemporary home on the Sea of Cortez. Floor-to-ceiling windows open the living areas to water on two sides: the sea on one, and a courtyard reflecting pool on the other. Surrounded by Ritz Carlton resort grounds, it’s close to golf and dining, plus art gallery walks in downtown San José del Cabo.`,
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
