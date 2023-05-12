'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53856003/original/3a727f27-0c10-4093-b570-018bfd32497d?im_w=960',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53856003/original/a9045607-396d-4851-b283-8e6ba90bccda?im_w=1200',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53856003/original/2d4a31ad-7f3b-4d80-8b79-a09de18d349b?im_w=1200',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53856003/original/91a85c15-1032-4a0a-a935-6c722c1aee3e?im_w=1200',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53856003/original/f42887da-2e96-4c83-b960-4a659f614cee?im_w=1200',
        preview: false
      },
      //============================
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/c92757c4-97a7-4b19-8f3e-658687382318.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/ca5262f8-132f-4b79-8fea-90aced530325.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/279f1649-639a-43f0-b48d-ebd2a62ff675.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/28aad9ae-6f55-44c0-9749-011abf51acf4.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/02af8965-4f05-4892-b6b0-c31b19e27b11.jpg?im_w=1200',
        preview: false
      },
      //============================
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/db0c37a6-0030-493a-8080-2a5a6c7b4796.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/ec08c03c-8a27-47bd-90ad-ce38edf83278.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/e19dacaa-236a-4dbc-8374-048d3465005e.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/ccc8571b-424a-4219-ace1-5273bb9d5947.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/a3e0e5b8-7bd1-4151-8699-f4d1507d4b94.jpg?im_w=1200',
        preview: false
      },
      //============================
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-553449454187790697/original/475750f4-33de-4e1d-bbd7-f1939896ce9c?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-553449454187790697/original/0d5c5b78-a432-4c57-b981-5515d905e671?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-553449454187790697/original/35369b36-1007-412e-8046-d3b895ffee4a?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-553449454187790697/original/9a128464-b7d0-4a53-b163-dff93a8224da?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-553449454187790697/original/9658729e-a184-4053-8fd3-5e087bb73f8e?im_w=720',
        preview: false
      },
      //============================
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/c99e5b00-a779-40e9-bd0e-5062dfdb7eb8.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/37b52d75-0079-416c-9415-e1dbecd3fe95.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/65387fcc-3f70-4bef-9e2b-6cc902d2594a.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/259155a8-911f-4bf8-b593-e7b7ceaf0c38.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/f5e4e4f3-5dea-4288-a7eb-e47a09580092.jpg?im_w=1200',
        preview: false
      },
      //============================
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/a42b3ce6-7ead-4067-8f6e-2fa1f19d0451.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/132584f9-2701-4386-b295-0a2d153ac411.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/df7af363-456f-4896-8d1a-887206289822.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/ffc4ca6c-b0b3-4d85-969e-2e42996cb7e9.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/02c58d21-24f0-47c3-8cb9-c559fe5fc057.jpg?im_w=1200',
        preview: false
      },
      //============================
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-789346824718227785/original/ec2d0a60-7d60-407e-bf63-ffcf0f44e864.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-789346824718227785/original/5586f10f-1124-4b10-9ca0-07c1553ee912.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-789346824718227785/original/af3c70fd-cac4-40fa-90fb-8ef51520d698.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-789346824718227785/original/d90ef8aa-4c37-4695-aa3e-1a2196edfcf8.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-789346824718227785/original/d3cf3530-5347-4fd8-bd55-137bed0b5650.jpeg?im_w=720',
        preview: false
      },
      //============================
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/1f6c495e-b877-4a48-9f2c-d8012f640166.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/81d3f240-67c7-439e-ad74-865730d24ef8?im_w=1200',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/cd917d61-c934-4431-afff-f937d69bc550?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/a071b3f9-3929-4096-9041-87995a8bff86?im_w=720',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/monet/Luxury-53719772/original/64f65389-96b3-4c5e-b8bf-7966dc16b55b?im_w=1200',
        preview: false
      },
      //============================
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752943099290902616/original/37dedddc-41f3-49e1-a69c-855e5cb07b8c.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752943099290902616/original/8af13690-e19b-4100-a94e-29fdd630f227.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752943099290902616/original/630db178-0761-48c2-8372-062f7c4aac27.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752943099290902616/original/fced6507-31c5-4fb2-9b34-750a54994b36.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752943099290902616/original/2a1d75d3-1714-4a3c-8c81-98b47879dbc3.jpeg?im_w=1200',
        preview: false
      },
      //============================
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/4c69ab90-38f9-4713-a0b6-e9a57628ce13.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/0864ebf0-45cb-4f5d-a526-f9393cc1c58a.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/def76b5e-8a60-487a-9d53-4bf71d58a3f3.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/282673f7-8fe0-4911-bcca-1c09bc87af0f.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/df3ba0d9-cf2d-401e-b2a6-5d0c8b55f392.jpg?im_w=720',
        preview: false
      },
      //============================
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/89f84105-afe3-46ea-8b14-768d7b2ca131.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/b4abea63-fde9-4e65-b46a-337e594f4c37.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/3af48652-0d54-478c-b181-f5214ee65dd8.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/49101123-fcf8-493e-a0e2-633142c1151a.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/ed203eb4-902b-41c2-a9c9-11fd4d0e2f81.jpg?im_w=720',
        preview: false
      },
      //============================
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['fake1', 'fake2', 'fake3']}
    }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
