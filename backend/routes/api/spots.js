const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, reqSpotAuth, restoreUser } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);
    }

});

//GET all spots
router.get('/', async (req, res) => {

    let data = await Spot.findAll();

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
        Spots: spots
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
        err.status = 404;
        err.message = "Spot couldn't be found";
        return next(err);
    }
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
