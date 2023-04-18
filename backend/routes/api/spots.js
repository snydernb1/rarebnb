const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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



// router.use(requireAuth(req, res, next));



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

module.exports = router;
