const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, reqSpotAuth, restoreUser, reqBookEditAuth, reqBookDeleteAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateBooking = [
    check('endDate')
        .custom((value, { req }) => {
        let start = new Date(req.body.startDate)
        let end =  new Date(req.body.endDate)
        return Date.parse(end) > Date.parse(start)
        })
      .withMessage('endDate cannot be on or before startDate'),
      handleValidationErrors
]

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
        console.log(newBooking)

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

//PUT edit booking by id
router.put('/:bookingId', requireAuth, reqBookEditAuth, validateBooking, async (req, res, next) => {

    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    const { startDate, endDate } = req.body;

    const bookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    });

    if (bookings) {
        for (let i = 0; i < bookings.length; i++) {

            let existingstart = new Date(bookings[i].startDate);
            let existingend =  new Date(bookings[i].endDate);
            let start = new Date(startDate);
            let end =  new Date(endDate);

            if ((Date.parse(start) >= Date.parse(existingstart) && Date.parse(start) <= Date.parse(existingend)) || (Date.parse(end) >= Date.parse(existingstart) && Date.parse(end) <= Date.parse(existingend)) || (Date.parse(start) < Date.parse(existingstart) && Date.parse(end) > Date.parse(existingend))) {
                const err = new Error();
                err.title = 'Bad Request';
                err.status = 403;
                err.message = "Sorry, this spot is already booked for the specified dates";
                err.errors = {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
                return next(err);
            };
        };
    };

    const currDate = new Date()
    const existEndDate = new Date(booking.endDate)
    if (Date.parse(existEndDate) < Date.parse(currDate)) {
        const err = new Error();
        err.title = 'Bad Request';
        err.status = 403;
        err.message = "Past bookings can't be modified";
        return next(err);
    }


    booking.startDate = startDate;
    booking.endDate = endDate;

    await booking.save();

    return res.json(booking)
});

//DELETE delete a booking by id
router.delete('/:bookingId', requireAuth, reqBookDeleteAuth, async (req, res, next) => {

    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);


    const currDate = new Date()
    const existStartDate = new Date(booking.startDate)
    if (Date.parse(existStartDate) < Date.parse(currDate)) {
        const err = new Error();
        err.title = 'Bad Request';
        err.status = 403;
        err.message = "Bookings that have been started can't be deleted";
        return next(err);
    }

    await booking.destroy();

    res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;
