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

// Handler for get spots of current user
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
        const numRating = parseFloat(review[0].avgRating)

        const fixedRating = numRating.toFixed(1)

        spots[i].avgRating = parseFloat(fixedRating)

        let previewImage = await SpotImage.findAll({
            where: {
                [Op.and]: [
                    {spotId: spots[i].id},
                    {preview: true}
                ]
            },
            raw: true
        })

        if(previewImage){
        spots[i].previewImage = previewImage[0].url
        }
    }

    responseBody.Spots = spots
    return res.json(responseBody)
})


// handler for get spot info by spotId
router.get('/:spotId', async(req, res) => {

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        raw: true
    })

    if(!spot){
        res.json({
            message: "Spot couldn't be found",
            statusCode: '404'
        })
    }

    // count for numReviews
    const reviewCount = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    })

    // query to get reviews for average star rating
     let review = await Review.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ],
            raw: true
        })

        const numRating = parseFloat(review[0].avgRating)

        const fixedRating = numRating.toFixed(1)

        spot.numReviews = reviewCount
        spot.avgStarRating = parseFloat(fixedRating)

    let imagesList = await SpotImage.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['id', 'url', 'preview'],
        raw: true
    })

    let owner = await User.findOne({
        where: {
            id: spot.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    })

    spot.SpotImages = imagesList
    spot.Owner = owner

    return res.json(spot)
})


// handler for get all spots
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

        const numRating = parseFloat(review[0].avgRating)

        const fixedRating = numRating.toFixed(1)

        spots[i].avgRating = parseFloat(fixedRating)

        let previewImage = await SpotImage.findAll({
            where: {
                [Op.and]: [
                    {spotId: spots[i].id},
                    {preview: true}
                ]
            },
            raw: true
        })
        if(previewImage[0]){
        spots[i].previewImage = previewImage[0].url
        }
    }

    responseBody.Spots = spots
    return res.json(responseBody)

})

// handler for posting new spot
router.post('/', authenticate, async(req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const ownerId = req.user.id
    try{
    const newSpot = await Spot.build({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    await newSpot.validate()
    await newSpot.save()

    res.json(newSpot)
} catch {
    res.status(400);
    res.json({
        message: 'Validation Error',
        statusCode: 400,
        errors: {
            address: 'Street address is required',
            city: 'City is required',
            state: 'State is required',
            country: 'Country is required',
            lat: 'Latitude is not valid',
            lng: 'Longitude is not valid',
            name: 'Name must be less than 50 characters',
            description: 'Description is required',
            price: 'Price per day is required'
        }
    })
}
})

// handler for adding an image to spot
router.post('/:spotId/images', authenticate, async(req, res) => {
    const { url, preview } = req.body;

    try{
    const newImage = await SpotImage.build({
        spotId: req.params.spotId,
        url,
        preview
    })

    await newImage.validate();
    await newImage.save();
    const spot = await Spot.findByPk(req.params.spotId);
    await spot.addSpotImage(newImage)
    res.json(newImage);
} catch {
    res.status(404);
    res.json({
        message: "Spot couldn't be found",
        statusCode: 404
    })
}
})

module.exports = router
