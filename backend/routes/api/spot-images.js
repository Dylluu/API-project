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

// handler for deleting spot images
router.delete('/:imageId', authenticate, async(req, res) => {
    const image = await SpotImage.findByPk(req.params.imageId);

    if(!image){
        res.status(404);
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }

    const spot = await Spot.findByPk(image.spotId);

    if(spot.ownerId !== req.user.id){
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    await image.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
