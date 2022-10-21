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
      userId: 2,
      review: 'Such a unique concept! Staying in a treehouse is one to talk about.',
      stars: 4
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Great place for a relaxing get away! Loved waking up every morning & seeing all the animals. Beautiful property & would love to stay here again!',
      stars: 5
    },
    {
      spotId: 1,
      userId: 4,
      review: 'Fantastic experience! We love unique places that are close to nature and this checked our boxes.',
      stars: 5
    },
    {
      spotId: 1,
      userId: 5,
      review: 'We had a fabulous time! The place was very clean and the beds were soooo comfortable. The heated blanket was a beautiful touch.',
      stars: 5
    },
    {
      spotId: 2,
      userId: 1,
      review: 'Close to the beach. Beautifully remodeled. Great host communication. Interaction with other people staying in Sea Terrace was very pleasant.',
      stars: 5
    },
    {
      spotId: 2,
      userId: 3,
      review: 'The house is beautiful and extremely clean. The 2 balconies, family room as well as the kitchen has great views of the bay.',
      stars: 4
    },
    {
      spotId: 2,
      userId: 4,
      review: 'All the bedrooms are very big and very comfortable. The bathrooms are very modern w/ walk in showers.',
      stars: 5
    },
    {
      spotId: 3,
      userId: 4,
      review: 'This home is an absolute dream! David was so communicative and nice.',
      stars: 5
    },
    {
      spotId: 3,
      userId: 5,
      review: 'Perfect home for a few days stay in Venice / LA. Everything worked well. David was friendly and responsive. Strong recommendation!',
      stars: 5
    },
    {
      spotId: 3,
      userId: 1,
      review: 'The place was great! Even better than the pictures, just a little pricey.',
      stars: 4
    },
    {
      spotId: 4,
      userId: 5,
      review: 'Super nice and accommodating place! Very well kept :)',
      stars: 5
    },
    {
      spotId: 4,
      userId: 2,
      review: 'Cool place for a vacation, but a bit cold.',
      stars: 4
    },
    {
      spotId: 5,
      userId: 3,
      review: 'What a beautiful area in the fall. We had a lovely drive to our great accommodations.',
      stars: 5
    },
    {
      spotId: 6,
      userId: 4,
      review: 'Amazing concept! I got lost and could not find the house at one point though.',
      stars: 4
    },
    {
      spotId: 6,
      userId: 3,
      review: 'Had a great time!',
      stars: 5
    },
    {
      spotId: 7,
      userId: 4,
      review: 'Best airbnb I have seen',
      stars: 5
    },
    {
      spotId: 8,
      userId: 5,
      review: 'Pools are super cool!',
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
