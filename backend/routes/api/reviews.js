const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, reqSpotAuth, reqReviewAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//GET all reviews by current user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const reviews = [];
    const data = await Review.findAll({
        where: {
            userId: user.id
        }
    });

//-------------------------------- Get User
 for (let i = 0; i < data.length; i++) {
     let id = data[i].id;
     let newReview = data[i].toJSON();

     let userData = await User.findByPk(user.id, {
         attributes: ['id', 'firstName', 'lastName']
        });

    newReview.User = userData;
//-------------------------------- Get Spot
let spotData = await Spot.findByPk(data[i].spotId, {
    attributes: ['id', 'ownerId', 'address', 'city', 'country', 'lat', 'lng', 'name', 'price']
});

let newSpot = spotData.toJSON();

let previewImage = await SpotImage.findOne({
    where: {
        spotId: data[i].spotId,
        preview: true
    },
    attributes: ['url']
});

newSpot.previewImage = previewImage.url;
newReview.Spot = newSpot;
//-------------------------------- Get ReviewImages
let reviewImages = await ReviewImage.findAll({
    where: {
        reviewId: data[i].id
    },
    attributes: ['id','url']
});

newReview.ReviewImages = reviewImages
reviews.push(newReview)
};

    return res.json({
        Reviews: reviews,
    });
});

//POST add image to review by review id
router.post('/:reviewId/images', requireAuth, reqReviewAuth, async (req, res, next) => {

    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    const  { url } = req.body;

    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: review.id
        }
    });
    // console.log(reviewImages)

    if (reviewImages.length > 10) {
        const err = new Error();
        err.status = 403;
        err.message = "Maximum number of images for this resource was reached";
        return next(err);
    }

    const img = await review.createReviewImage({
        url
    });

    res.json({
        id: img.id,
        url
    });
});





module.exports = router;
