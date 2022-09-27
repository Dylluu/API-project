const express = require('express');
const { Spot, Review, SpotImage, sequelize, User, Booking, ReviewImage } = require('../../db/models');
const { Op, json } = require('sequelize');
const { response } = require('express');
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


// handler for deleting review images
router.delete('/:imageId', authenticate, async(req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);

    if(!reviewImage){
        res.status(400);
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }

    const review = await Review.findByPk(reviewImage.reviewId);

    if(review.userId !== req.user.id){
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    await reviewImage.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
