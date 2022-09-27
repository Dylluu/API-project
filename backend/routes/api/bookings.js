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


// handler for editing a booking
router.put('/:bookingId', authenticate, async(req, res, next) => {
    const { startDate, endDate } = req.body;
    const booking = await Booking.findByPk(req.params.bookingId);

    if(!booking){
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    if(booking.userId !== req.user.id){
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    const currDate = new Date().toJSON().slice(0, 10);
    if(currDate > booking.endDate){
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

    const spot = await Spot.findByPk(booking.spotId)

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
        if(startDate < endDate){
        const updatedBooking = await booking.update({
            startDate,
            endDate
        })
        return res.json(updatedBooking)
    } else {
        throw new Error('error')
    }

        } catch{
            res.status(400);
            return res.json({
                message: 'Validation error',
                statusCode: 400,
                errors: {
                    endDate: 'endDate cannot come before startDate'
                }
            })
        }
})


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
