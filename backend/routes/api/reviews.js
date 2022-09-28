const express = require('express');
const { Spot, Review, SpotImage, sequelize, User, Booking, ReviewImage } = require('../../db/models');
const { Op, json } = require('sequelize');
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
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }
        ]
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

    res.json({Reviews})
})


// handler for adding an image to review based on review id
router.post('/:reviewId/images', authenticate, async(req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    if(!review){
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    if(review.userId !== req.user.id){
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    const reviewCount = await ReviewImage.count({
        where: {
            reviewId: req.params.reviewId
        }
    })

    console.log(reviewCount)
    if(reviewCount >= 10){
        res.status(403);
        return res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    }

    const { url } = req.body;

    const newImage = await ReviewImage.build({
        reviewId: review.id,
        url
    })
    await newImage.validate()
    await newImage.save()
    await review.addReviewImage(newImage)

    let jsonReviewImage = newImage.toJSON();

    let responseBody = {};
    responseBody.id = jsonReviewImage.id;
    responseBody.url = jsonReviewImage.url;

    return res.json(responseBody)
})


// handler for editing a review
router.put('/:reviewId', authenticate, async(req, res, next) => {
    const findReview = await Review.findByPk(req.params.reviewId);
    const { review, stars } = req.body;

    if(!findReview){
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    if(findReview.userId !== req.user.id){
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    try{
        const updatedReview = await findReview.update({
            review,
            stars
        })
        return res.json(updatedReview)
    } catch(error) {
        error.status = 400;
        error.message = 'Validation error'
        next(error)
    }
})


// handler for deleting a review
router.delete('/:reviewId', authenticate, async(req, res) => {
    const findReview = await Review.findByPk(req.params.reviewId);

    if(!findReview){
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    if(findReview.userId !== req.user.id){
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    await findReview.destroy();
    return res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
})

module.exports = router
