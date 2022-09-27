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

// handler for getting all bookings of current user
router.get('/current', authenticate, async(req, res) => {
    const responseBody = {};
    const bookingsArray = [];

    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
        model: Spot,
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    }
    })


    for(let i = 0; i < bookings.length; i++){
        let jsonBooking = bookings[i].toJSON()
        let previewImage = await SpotImage.findAll({
            where: {
                [Op.and]: [
                    {spotId: jsonBooking.spotId},
                    {preview: true}
                ]
            },
            raw: true
        })


        if(previewImage[0]){
        jsonBooking.Spot.previewImage = previewImage[0].url
        } else if(!previewImage[0]){
            jsonBooking.Spot.previewImage = null
        }
        bookingsArray.push(jsonBooking)
    }

    responseBody.Bookings = bookingsArray;
    res.json(responseBody)
})

module.exports = router;
