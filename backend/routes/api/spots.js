const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, reqSpotAuth, restoreUser, reqBookAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();
//auto redeploy test

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists( {checkFalsy: true })
        .withMessage('City is required'),
        check('state')
        .exists( {checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists( {checkFalsy: true } )
        .isInt( { min: 1, max: 5 } )
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

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


// console.log('in spots router');
// Helper function to get avgRating and numReviews
const avgRating = async (id) => {

    const avgObj = {}

    let revData = await Review.findAll({
        where: {
            spotId: id
        }
    });

    let ratingTotal = 0;
    revData.forEach(ele => {
        ratingTotal = ratingTotal + ele.stars
    });

    let avgRating = ratingTotal / revData.length;
    avgObj.numReviews = revData.length;
    avgObj.avgStarRating = avgRating;

    return avgObj;
};

//GET all spots by owner
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;
    let spots = []

    if (user) {
        let data = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        });


            //-------------------------------- Average Rating

        for (let i = 0; i < data.length; i++) {
        let id = data[i].id;

            let revData = await Review.findAll({
                where: {
                    spotId: id
                }
            });

            let ratingTotal = 0;
            revData.forEach(ele => {
                ratingTotal = ratingTotal + ele.stars
            });

            let avgRating = ratingTotal / revData.length;

            let newSpot = data[i].toJSON();
            newSpot.avgRating = avgRating;

            //-------------------------------- Preview Images

            let imgData = await SpotImage.findAll({
                where: {
                    spotId: id
                }
            });

            imgData.forEach(ele => {
                if (ele.preview === true) {
                    newSpot.previewImage = ele.url
                }
            });

            spots.push(newSpot);
        };

        res.json({
            Spots: spots
        });
    };
});


//GET spot by id
router.get('/:spotId', async (req, res, next) => {

    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    console.log(spot)
    if (spot) {
        const objSpot = spot.toJSON();

        const avgObj = await avgRating(spotId);
        // console.log('avgobj test', avgObj);

        const SpotImages = await SpotImage.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['id', 'url', 'preview']
        });

        const Owner = await User.findOne({
            where: {
                id: spot.ownerId
            },
            attributes: ['id', 'firstName', 'lastName']
        });

        return res.json({
            ...objSpot,
            ...avgObj,
            SpotImages,
            Owner
        });
    } else {
        const err = new Error();
        err.title = 'Bad Request';
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);
    }

});

//GET all spots
router.get('/', async (req, res, next) => {

    let query = {
        where: {},
    }

//------------------------------------------------------------ Query filters
    let {page, size, minLat, minLng, minPrice, maxLat, maxLng, maxPrice} = req.query


    let errCount = 0;


    page = Number(page);
    size = Number(size);

    const err = new Error();
    err.title = 'Bad Request';
    err.status = 400;
    err.message = "Bad Request";
    err.errors = {};




    if (page <= 0) {
        err.errors.page = "Page must be greater than or equal to 1"
        errCount += 1;
    }
    if (size <= 0) {
        err.errors.size = "Size must be greater than or equal to 1"
        errCount += 1;
    }
    if (minPrice <= 0) {
        err.errors.minPrice = "Minimum price must be greater than or equal to 0"
        errCount += 1;
    }
    if (maxPrice <= 0) {
        err.errors.maxPrice = "Maximum price must be greater than or equal to 0"
        errCount += 1;
    }
    if (isNaN(minLat) && minLat !== undefined) {
        err.errors.minLat = "Minimum latitude is invalid"
        errCount += 1;
    }
    if (isNaN(maxLat) && maxLat !== undefined) {
        err.errors.maxLat = "Maximum latitude is invalid"
        errCount += 1;
    }
    if (isNaN(minLng) && minLng !== undefined) {
        err.errors.minLng = "Minimum longitude is invalid"
        errCount += 1;
    }
    if (isNaN(maxLng) && maxLng !== undefined) {
        err.errors.maxLng = "Maximum longitude is invalid"
        errCount += 1;
    }



    if (errCount > 0) {
        return next(err);
    }

    if (isNaN(page) || page < 0) page = 1;
    if (isNaN(size) || size < 0) size = 20;
    if (isNaN(size) || size > 20) size = 20;
    if (isNaN(page) || page > 10) page = 10;

    query.limit = size
    query.offset = size * (page - 1)

console.log('minprice', minPrice)

    if (minLat) {
        query.where.lat = { [Op.gte]: `${minLat}`}
    }
    if (maxLat) {
        query.where.lat = { [Op.lte]: `${maxLat}`}
    }
    if (minLat && maxLat) {
        query.where.lat = { [Op.gte]: `${minLat}`, [Op.lte]: `${maxLat}`}
    }


    if (minLng) {
        query.where.lng = { [Op.gte]: `${minLng}`}
    }
    if (maxLng) {
        query.where.lng = { [Op.lte]: `${maxLng}`}
    }
    if (maxLng && minLng) {
        query.where.lng = { [Op.gte]: `${minLng}`, [Op.lte]: `${maxLng}`}
    }


    if (minPrice) {
        query.where.price = { [Op.gte]: `${minPrice}`}
    }
    if (maxPrice) {
        query.where.price = { [Op.lte]: `${maxPrice}`}
    }
    if (maxPrice && minPrice) {
        query.where.price = { [Op.gte]: `${minPrice}`, [Op.lte]: `${maxPrice}`}
    }


    //---------------------------------------------- Find all spots
    let data = await Spot.findAll(query);

    let spots = []

            //-------------------------------- Average Rating

    for (let i = 0; i < data.length; i++) {
       let id = data[i].id;

       let revData = await Review.findAll({
            where: {
                spotId: id
            }
        });

        let ratingTotal = 0;
        revData.forEach(ele => {
            ratingTotal = ratingTotal + ele.stars
        });

        let avgRating = ratingTotal / revData.length;

        let newSpot = data[i].toJSON();
        newSpot.avgRating = avgRating;

        //-------------------------------- Preview Images

        let imgData = await SpotImage.findAll({
            where: {
                spotId: id
            }
        });

        imgData.forEach(ele => {
            if (ele.preview === true) {
                newSpot.previewImage = ele.url
            }
        });

        spots.push(newSpot);
    };




    return res.json({
        Spots: spots,
        page: page,
        size: size
    });
});

//POST add image by spot id
router.post('/:spotId/images', requireAuth, reqSpotAuth, async (req, res) => {

    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

        const { url, preview } = req.body;

        const img = await spot.createSpotImage({
            url, preview
        });

        return res.json({
            id: img.id,
            url,
            preview
        });
});

//GET all reviews by spot id
router.get('/:spotId/reviews', async (req, res, next) => {

    // console.log("in /:spotId/reviews")
    const spotId = req.params.spotId;
    let reviews = []

    const spot = await Spot.findByPk(spotId);

    if (spot) {

        //-------------------------------- Get Reviews
        let reviewData = await Review.findAll({
            where: {
                spotId: spot.id
            }
        });
        for (let i = 0; i < reviewData.length; i++) {
            let reviewId = reviewData[i].id;
            let newReview = reviewData[i].toJSON();

        console.log("test", newReview)

    //     //-------------------------------- Get User
            console.log('for loop')

            let userData = await User.findByPk(reviewData[i].userId, {
                attributes: ['id', 'firstName', 'lastName']
            });

            console.log(userData)
       newReview.User = userData;

       //-------------------------------- Get ReviewImages
        let reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: reviewData[i].id
            },
            attributes: ['id','url']
        });

        newReview.ReviewImages = reviewImages
        reviews.push(newReview)
        };

        return res.json({
            Reviews: reviews
        });
    } else {
        const err = new Error();
        err.title = 'Bad Request';
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);
    };
});

//GET all bookings by spot id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const { user } = req;

    if (spot) {
        if (user.id == spot.ownerId) {
            let bookings = [];
            const bookingData = await Booking.findAll({
                where: {
                    spotId: spotId
                }
            });

            for (let i = 0; i < bookingData.length; i++) {
               let newBooking = bookingData[i].toJSON();

               const user = await User.findByPk(bookingData[i].userId, {
                attributes: ['id', 'firstName', 'lastName']
               });

               newBooking.User = user;
               bookings.push(newBooking);
            }

            return res.json({
                Bookings: bookings
            });
        } else if (user.id !== spot.ownerId) {
            let bookings = [];
            const Bookings = await Booking.findAll({
                where: {
                    spotId: spotId
                },
                attributes: ['spotId', 'startDate', 'endDate']
            });
            return res.json({
                Bookings
            });
    }
    } else {
        const err = new Error();
        err.title = 'Bad Request';
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);
    }


});

//POST create review by spot id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {

    const spotId = req.params.spotId;
    const { review, stars } = req.body;
    const { user } = req;
    const spot = await Spot.findByPk(spotId);

    if (spot) {

        const existingReview = await Review.findOne({
            where: {
                userId: user.id,
                spotId: spotId
            }
        });

        if (existingReview) {
            const err = new Error();
            err.status = 500;
            err.message = "User already has a review for this spot";
            return next(err);
        }

        const newReview = await spot.createReview({
            review, stars, userId: user.id
        });

        return res.json(newReview)
    } else {
        const err = new Error();
        err.title = 'Bad Request';
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);
    }
});

//POST create booking by spot id
router.post('/:spotId/bookings', requireAuth, reqBookAuth, validateBooking, async (req, res, next) => {

    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const { startDate, endDate } = req.body;
    const { user } = req;

    const bookings = await Booking.findAll({
        where: {
            spotId: spotId
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
            }
        }
    }

    // (Date.parse(existingstart) <= Date.parse(end) || (Date.parse(existingend) >= Date.parse(start)))

    const booking = await spot.createBooking({
        startDate, endDate, userId: user.id
    });

    return res.json(booking);
    // return res.json({startDate, endDate, userId: user.id});



});

//POST create a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {

    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId: user.id, address, city, state, country, lat, lng, name, description, price
    });

    res.status(201);
    res.json(newSpot)
});

//PUT edit a spot
router.put('/:spotId', requireAuth, reqSpotAuth, validateSpot, async (req, res) => {

    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const { address, city, state, country, lat, lng, name, description, price} = req.body;

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    res.json(spot)
});

//DELETE delete a spot
router.delete('/:spotId', requireAuth, reqSpotAuth, async (req, res) => {

    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    await spot.destroy();

    res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;
