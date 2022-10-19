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
   await queryInterface.bulkInsert('Reviews', [
    {
      spotId: 1,
      userId: 1,
      review: 'Such a unique concept! Staying in a treehouse is one to talk about. Although our adventure was short and sweet - it was a perfect amount of time. I would only recommend staying here for 1-2 days. The bed and couch could use an upgrade but worth going to for some quiet and relaxation time.',
      stars: 4
    },
    {
      spotId: 1,
      userId: 2,
      review: 'Great place for a relaxing get away! Loved waking up every morning & seeing all the animals. Beautiful property & would love to stay here again!',
      stars: 5
    },
    {
      spotId: 2,
      userId: 2,
      review: 'Close to the beach. Beautifully remodeled. Great host communication. Interaction with other people staying in Sea Terrace was very pleasant.',
      stars: 5
    },
    {
      spotId: 3,
      userId: 3,
      review: 'This home is an absolute dream! Eric was so communicative and left such detailed instructions it truly felt like our home away from home. From the welcome goodies to the bathroom amenities there is no detail left untouched. Thank you thank you thank you, what a lovely and relaxing trip.',
      stars: 5
    },
    {
      spotId: 3,
      userId: 2,
      review: 'Perfect home for a few days stay in Venice / LA. Everything worked well. Eric was friendly and responsive. Strong recommendation!',
      stars: 5
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
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
