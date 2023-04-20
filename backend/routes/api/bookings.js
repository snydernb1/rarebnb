const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, reqSpotAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//GET current user's bookings
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;
    let bookings = [];

    //---------------------- find bookings
   if (user) {
    let data = await Booking.findAll({
        where: {
            userId: user.id
        }
    });

    //----------------------- find spot
    for (let i = 0; i < data.length; i++) {
        let id = data[i].spotId;
        let newBooking = data[i].toJSON();

        const spot = await Spot.findByPk(id, {
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        });

        let newSpot = spot.toJSON();

        //------------------------ find preview image
        let imgData = await SpotImage.findOne({
            where: {
                spotId: id,
                preview: true
            }
        });

        console.log(imgData);
        newSpot.previewImage = imgData.url

        newBooking.Spot = newSpot;
        bookings.push(newBooking);
    };


    return res.json({
        Bookings: bookings,
        // data
    });
   }


});



module.exports = router;
