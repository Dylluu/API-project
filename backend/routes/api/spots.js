const express = require('express');
const { Spot, Review, SpotImage, sequelize, User, Booking, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/', async(req, res) => {
    res.json({
        message: 'Route is working'
    })
})

module.exports = router
