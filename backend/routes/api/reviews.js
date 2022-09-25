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

// handler for getting all reviews of current user
router.get('/current', authenticate, async(req, res) => {
    const responseBody = {};
    const Reviews = [];

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
        },
        {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        }]
    })

    // console.log(reviews[0].toJSON())
    // console.log(reviews[0].toJSON().Spot.id)

    for(let i = 0; i < reviews.length; i++){
        let review = reviews[i].toJSON()
        let previewImage = await SpotImage.findOne({
            where: {
                [Op.and]: [
                    {spotId: review.Spot.id},
                    {preview: true}
                ]
            }
        })

        if(previewImage){
        review.Spot.previewImage = previewImage.url
        }
        Reviews.push(review)
    }

    const spots =

    responseBody.Reviews = Reviews;


    res.json({Reviews})
})

module.exports = router
