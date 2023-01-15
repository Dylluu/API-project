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
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/3c8f1d60-7d81-4a57-9ed9-4e52e022ec0f.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/58838626-235e-4e88-9539-1f62643b920f.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/f6915c4c-21e1-4a9c-8b28-ad18b9bd8dd9.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/edb197b1-7354-4ff1-8c3d-30f80de85490.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/6236fa97-47fe-4183-8186-40115ba9a1cc.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/70ea6a31-96da-42ef-9e8d-4fe4a497cb56.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/372c80fc-dab8-496d-98a6-2c898087e6ca.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/4f474766-2a50-414c-abd6-644e41e1fc11.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/4c1e245a-6fac-4643-a6f4-10bd790de8c3.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/af1b67d4-fa6f-4162-9c12-8477f339a93d.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/d3f77c1a-c1aa-4adc-bdc1-85ee32eb291d.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/0773946e-233c-4a83-9eef-2d8597fa0ef0.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45054521/original/0b4a0ece-1ed4-4518-84e5-5d14afc90ccb.jpeg?im_w=480',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/073f3f02-503b-4135-a138-dc0fca5af6d7.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/0e25c444-d933-4054-b4fa-471160fed27f.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/8255bdb1-1d65-4325-a744-6487dc51453b.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/1aed8660-0a2c-4ecd-bdfc-e2d0217e2a4b.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34577812/original/8b0bb13c-9a61-4cee-9882-9c177473124b.jpeg?im_w=480',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-34577812/original/abeb8e1c-b2e8-4a09-9a7a-eb2584c6fef9.jpeg?im_w=480',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/8e062776-e4d5-4a27-a3d7-7e59f8eb7521.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/88d46041-60a0-4064-ae28-03423174766c.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/3190b76f-ae94-4233-9bd8-8a2460ffd19d.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/c9cf376c-3c53-4165-a9cf-070e4e6cb503.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/decae0c6-36b3-4526-8855-393a68f81ae1.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/b077a2ad-8774-42ba-b995-f1de6f49eed5.jpg?im_w=480',
      preview: false
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/b92fc905-70ea-449a-aa95-c79ade3ceadb.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/08d7be05-70aa-4a1d-a964-d9ba526f5562.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/a2d99008-721a-4153-89e5-c3d251a0389b.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/5db96c16-21bb-492a-a427-533ef988ccac.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/62a4b00e-e5d0-45b9-bc6e-0d597e5fc4dc.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/ca513d07-75cb-4626-9ee2-44dafe21c1d2.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/f38c6c31-b9fa-4adb-9af5-cf83efdb667e.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/4ac39e10-eada-4d1f-95fb-70a76d350bec.jpg?im_w=720',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/fedf133f-8fa6-4ce9-b416-8cd447b7d1ce.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/37c6c735-cb62-437c-bad6-64d555f270ec.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/659a7c8a-ebe9-440f-8776-e1491142d9c7.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/81a5da3d-d8b8-46ae-b767-3e18cfa6ae85.jpg?im_w=720',
      preview: false
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/e81527f0-a247-4749-829e-7b25c5f6d303.jpg?im_w=720',
      preview: false
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/3d305bc1-786d-40c8-a4c6-4d9df34c1830.jpg?im_w=720',
      preview: false
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/4e458b7f-1f34-4e84-bd67-8822c4d8830c.jpg?im_w=720',
      preview: false
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49014160/original/87a76f76-4f8b-43c0-8570-bf37935570ec.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49014160/original/f79bb27a-2ef5-4769-b0f4-7ae54f9082f0.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49014160/original/81d31ae1-c7c3-4df5-98e7-c4d18cf8fb83.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49014160/original/ae80b361-822a-4654-ba9b-10d104b24069.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-49014160/original/7ebd03e9-e326-4231-a6a5-2ac80cee930b.jpeg?im_w=720',
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
