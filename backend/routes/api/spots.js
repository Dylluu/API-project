const express = require('express');
const { Spot, Review, SpotImage, sequelize, User, Booking, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();

const authenticate = (req, res, next) => {
    if(req.user){
        return next();
    } else {
    res.status(401);
    res.json({
        message: 'Authentication required',
        statusCode: 401
    })
    }
}

router.get('/current', authenticate, async(req, res) => {
    const responseBody = {};

    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        raw: true
    })

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
        spots[i].avgRating = review[0].avgRating.toFixed(1)

        let previewImage = await SpotImage.findAll({
            where: {
                [Op.and]: [
                    {spotId: spots[i].id},
                    {preview: true}
                ]
            },
            raw: true
        })
        spots[i].previewImage = previewImage[0].url
    }

    responseBody.Spots = spots
    return res.json(responseBody)
})

router.get('/', async(req, res, next) => {
    const responseBody = {};

    const spots = await Spot.findAll({
        raw: true
    })

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
        spots[i].avgRating = review[0].avgRating.toFixed(1)

        let previewImage = await SpotImage.findAll({
            where: {
                [Op.and]: [
                    {spotId: spots[i].id},
                    {preview: true}
                ]
            },
            raw: true
        })
        spots[i].previewImage = previewImage[0].url
    }

    responseBody.Spots = spots
    return res.json(responseBody)
})

module.exports = router
