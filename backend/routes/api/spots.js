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


// handler for creating a booking fom a spot based on spotId
router.post('/:spotId/bookings', authenticate, async(req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { startDate, endDate } = req.body;

    if(!spot){
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if(spot.ownerId === req.user.id){
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    const bookings = await spot.getBookings()

    for(let i = 0; i < bookings.length; i++){
        let jsonBookings = bookings[i].toJSON();
        let start = jsonBookings.startDate;
        let end = jsonBookings.endDate;

        if(startDate == start || startDate == end || (startDate > start && startDate < end)){
            res.status(403);
            return res.json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errors: {
                    startDate: 'Start date conflicts with an existing booking'
                }
            })
        }
        if(endDate == start || endDate == end || (endDate > start && endDate < end)){
            res.status(403);
            return res.json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errors: {
                    endDate: 'End date conflicts with an existing booking'
                }
            })
        }
    }

    try{
    const newBooking = await Booking.build({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
    })

    await newBooking.validate();
    await newBooking.save();
    return res.json(newBooking)

    } catch(error){
        error.status = 400;
        error.message = 'Validation error';
        next(error)
    }
})


// handler for getting all bookings for a spot based on the spotId
router.get('/:spotId/bookings', authenticate, async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot){
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if(spot.ownerId !== req.user.id){
        const Bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.json({Bookings})
    }
    if(spot.ownerId === req.user.id){
        const Bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['id','spotId', 'userId', 'startDate', 'endDate','createdAt', 'updatedAt'],
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })
        return res.json({Bookings})
    }
})

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

        if(previewImage[0]){
        spots[i].previewImage = previewImage[0].url
        } else if(!previewImage[0]){
            spots[i].previewImage = null
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
    let responseBody = {};
    let pagination = {};
    let { page, size } = req.query;

    if(page && (page <= 0 || isNaN(page))){
        page = 1
    }
    if(size && (size <= 0 || isNaN(size))){
        size = 20
    }

    if(page && size){
    pagination.limit = size;
    pagination.offset = (page - 1) * size;
    }


    const spots = await Spot.findAll({
        ...pagination,
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
        } else if(!previewImage[0]){
        spots[i].previewImage = null
        }
    }

    responseBody.Spots = spots;

    if(page && size){
        responseBody.page = parseInt(page),
        responseBody.size = parseInt(size)
    }
    return res.json(responseBody)

})

// handler for posting new spot
router.post('/', authenticate, async(req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const ownerId = req.user.id
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

    res.status(201);
    res.json(newSpot)
})

// handler for adding an image to spot
router.post('/:spotId/images', authenticate, async(req, res) => {
    const { url, preview } = req.body;
    const ownerId = req.user.id

    const spot = await Spot.findByPk(req.params.spotId);

    if(spot){
        if(ownerId !== spot.ownerId){
            res.status(403)
            return res.json({
                message: 'Forbidden',
                statusCode: 403
            })
        }
    const newImage = await SpotImage.build({
        spotId: req.params.spotId,
        url,
        preview
    })

    await newImage.validate();
    await newImage.save();
    await spot.addSpotImage(newImage)
    return res.json(newImage);
}

    res.status(404);
    res.json({
        message: "Spot couldn't be found",
        statusCode: 404
    })

})

// handler for editing a spot
router.put('/:spotId', authenticate, async(req, res) => {
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot){
        res.status(404);
        return res.json({
        message: "Spot couldn't be found",
        statusCode: 404
        })
    }
        if(ownerId !== spot.ownerId){
            res.status(403)
            return res.json({
                message: 'Forbidden',
                statusCode: 403
            })
        }
        const updatedSpot = await spot.update({
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
        return res.json(updatedSpot)
})

// handler for deleting a spot
router.delete('/:spotId', authenticate, async(req, res) => {
    const ownerId = req.user.id;

    const spot = await Spot.findByPk(req.params.spotId);

    if(spot){
        if(ownerId !== spot.ownerId){
            res.status(403)
            return res.json({
                message: 'Forbidden',
                statusCode: 403
            })
        }
        await spot.destroy();
        res.json({
            message: 'Successfully deleted',
            statusCode: 200
        })
    }
    res.status(404);
    res.json({
        message: "Spot couldn't be found",
        statusCode: 404
    })
})

// handler to get reviews by spot's id
router.get('/:spotId/reviews', async(req, res) => {
    const Reviews = [];

    const spot = await Spot.findByPk(req.params.spotId);
    if(!spot){
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }
    ]
    })

    // if(!reviews.length){
    //     res.status(404);
    //     return res.json({
    //         message: "Spot couldn't be found",
    //         statusCode: 404
    //     })
    // }
    Reviews.push(...reviews)

    res.json({Reviews})
})

// handler for creating a review based on the spot's id
router.post('/:spotId/reviews', authenticate, async(req, res) => {
    const { review, stars } = req.body;
    const currentUserId = req.user.id;

    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot){
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const nonUniqueReviews = await Review.findAll({
        where: {
            [Op.and]: {
                spotId: req.params.spotId,
                userId: currentUserId
            }
        }
    })

    if(nonUniqueReviews.length){
        res.status(403);
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }

        const newReview = await Review.build({
            spotId: req.params.spotId,
            userId: currentUserId,
            review,
            stars
        })

        await newReview.validate();
        await newReview.save();
        await spot.addReview(newReview);
        res.status(201);
        return res.json(newReview);
})

module.exports = router
