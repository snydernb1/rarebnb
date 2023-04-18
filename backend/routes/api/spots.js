const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAith } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// console.log('in spots router');

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
        // console.log("avgrating", avgRating);

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

        // console.log("testing", newSpot);
        spots.push(newSpot);

    }

    // console.log("testingArr", spots);


    return res.json({
        Spots: spots
    });
});


module.exports = router;
