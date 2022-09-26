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

    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {model: Spot}
    })

    responseBody.Bookings = bookings;

    res.json(responseBody)
})

module.exports = router;
