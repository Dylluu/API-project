const express = require('express');
const { Spot, Review, SpotImage, sequelize, User, Booking, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/', async(req, res, next) => {
    const responseBody = {};
    const responseSpots = []

    const spots = await Spot.findAll({
        raw: true
    })
    console.log(spots)

    for(let i = 0; i < spots.length; i++){
        let review = await Review.findAll({
            where: {
                spotId: spots[i].id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ],
            raw: true
        })
        console.log(review)
        spots[i].avgRating = review[0].avgRating
    }

    responseBody.Spots = spots
    res.json(responseBody)
})

module.exports = router
