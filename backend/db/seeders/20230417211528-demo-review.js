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
        spotId: 2,
        userId: 2,
        review: 'Great stay. Clean cabin, great location, walk to gondola, nice and up to date amenities. The host was attentive and easy to speak with. Would highly recommend to anyone.',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'As advertised. Quick walk to gondola.',
        stars: 2
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Overall, great place to go with a large group and literally 100 steps away from the Gondola. When we first arrived, there were issues with the garage and a few items inside, however, they the had maintenance fix the issues right away. Very pleased with the management and love this spot for a big group ski trip.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 5,
        review: 'My family and I LOVED this home. The location, the views, the home in general, all absolutely perfect. We had such a wonderful trip and the heart of it was this beautiful home.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 6,
        review: `Four Pines 6 was an ideal house and location for our group of 12. There was plenty of room for everyone to spread out and great common areas where we could join up for TV watching, game playing, and dining. The villa management group was very helpful and accommodating.`,
        stars: 4
      },
      //===============================
      {
        spotId: 7,
        userId: 1,
        review: `It was great to come back to this amazing place. Thank you so much for always being attentive and for keeping your place clean and beautiful! I’ll be back again soon :)`,
        stars: 4
      },
      {
        spotId: 7,
        userId: 7,
        review: 'Very responsive host and beautiful home!',
        stars: 5
      },
      {
        spotId: 7,
        userId: 6,
        review: `Pros: Location, location, location! The view is breathtaking. I've stayed in other Hamilton Cove units and this unit has the best view. The place was clean.

        Cons: This unit would be stellar if a few small touches/upgrades were made. For example, a few blinds were missing in the kitchen nook, and the ones that were there were old. There weren't any curtains in the living area where the sleeper sofa is located so it was hard to sleep once the sun started shining in.`,
        stars: 2
      },
      //===============================
      {
        spotId: 10,
        userId: 1,
        review: `We had a lovely stay in this home. It was very comfortable for our family vacation with 4 adults, 2 kids and our dogs. The living spaces were perfect for playing games, watching movies and enjoying the beautiful ocean through all of the windows. The yard is incredible and the view is amazing!`,
        stars: 4
      },
      {
        spotId: 10,
        userId: 7,
        review: 'What a beautiful spot. Very comfortable home with the most gorgeous views and outdoor space. Very private and peaceful. Great location. My family of 5 had such a great time playing and relaxing here. Felt like heaven spending time in the pool, hot tub, yard, living space overlooking the ocean',
        stars: 5
      },
      {
        spotId: 10,
        userId: 6,
        review: `Great house with a beautiful view and back yard. We enjoyed the heated pool and hot tub. The house was comfortable for small children.`,
        stars: 5
      },
      {
        spotId: 10,
        userId: 2,
        review: `This is a new favorite. I am tentative to say how fabulous this is as I want it to stay open for our future visits. The home is so peaceful and on such a great location of land. The sunsets are amazing. We didn't want to leave.`,
        stars: 4
      },
      //===============================
      {
        spotId: 11,
        userId: 1,
        review: `The beds SO uncomfortable we couldn't sleep. Big problem. Large jacuzzi tubs awesome except they don't work. Mold in the shower floor. Screens ripped and doors don't work well. Only two towels per bathroom. We are 4 what about the pool?? No dishwasher detergent had to handwash dishes. Some lights in kitchen didnt work. Bottomline can't sleep can't stay.`,
        stars: 2
      },
      {
        spotId: 11,
        userId: 4,
        review: 'The place was beautiful, the views were amazing. Highly recommended!!',
        stars: 5
      },
      {
        spotId: 11,
        userId: 6,
        review: `My husband, daughters and I really enjoyed staying here. We will definitely rent this place again!`,
        stars: 5
      },
      {
        spotId: 11,
        userId: 2,
        review: `It was nice, very pretty views! No A/C or heating so be prepared. Kitchen is okay, slight lighting issues and minimal cook preparation utensils. Location is good, but side road is not the prettiest(very bumpy).`,
        stars: 3
      },
      //===============================
      {
        spotId: 5,
        userId: 1,
        review: `This mansion was great. The pictures really represent what is actually there. The bedrooms were large and complete with nice furnishings. Each bedroom had an attached full bathroom with everything you could need. The kitchen and living areas were also great.`,
        stars: 5
      },
      {
        spotId: 5,
        userId: 4,
        review: 'Great property',
        stars: 5
      },
      {
        spotId: 5,
        userId: 6,
        review: `Beautiful house, very well looked after and located in a wonderful, poetic place and close to all the local beauties. Thank you !!!`,
        stars: 5
      },
      {
        spotId: 5,
        userId: 2,
        review: `It is a wonderful property in a privileged place by the sea. The house is not missing any details, luxury and modernity with film landscapes. The hosts are attentive and friendly people available at all times and make you feel at home.`,
        stars: 5
      },
      //===============================
      {
        spotId: 1,
        userId: 7,
        review: `Comfortable, well-positioned, spacious`,
        stars: 3
      },
      {
        spotId: 1,
        userId: 4,
        review: 'Dogs loved it, We loved it. Good for work and fun stays. I can recommend it to anybody.',
        stars: 4
      },
      {
        spotId: 1,
        userId: 6,
        review: `Perfect place for our family to stay . Very clean & so comfortable.`,
        stars: 5
      },
      //===============================

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
