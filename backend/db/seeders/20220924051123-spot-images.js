'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('SpotImages', [
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/e7e72c42-3268-4e06-992b-bb75b6aa0a00.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/e1ea285e-f417-43e3-80ae-b1d6114c9d90.jpeg?im_w=480',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/664e64c8-de81-41a2-b58e-776d08d29713.jpeg?im_w=480',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/0cc597ae-7b11-4cd3-9252-b57a0bc4710d.jpeg?im_w=480',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-46677438/original/39c768bf-9d1b-4fef-9247-2354472fd7ce.jpeg?im_w=480',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/97c4c7ce-3ded-445e-b2f8-9ded10ae5be0.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/33c9d717-bfef-4bd0-a621-7f6023850905.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/638856db-fa95-4dbc-807d-a485b02e4880.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/e88ba83b-8450-441b-a495-06c002128cd6.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/a9e9d441-6480-43d9-805e-16fce0084475.jpg?im_w=720',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37494869/original/badbdc0a-29a9-45ac-9625-ab6f3d5a1ee4.jpeg?im_w=960',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/87520d01-348b-4e98-9936-20c56afd1105.jpg?im_w=240',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/a397b8f4-6bb8-44f0-b9f2-821ac6675011.jpg?im_w=240',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/3d82d1d2-a626-4607-9dc9-71d46ae1a15d.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/fc49a8cd-c1bc-4e67-8612-6f734f717cdb.jpg?im_w=1200',
      preview: false
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
