const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth, reqSpotAuth, restoreUser, reqBookEditAuth, reqBookDeleteAuth, reqBookSpotImageAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//DELETE delete a spot-image
router.delete('/:imageId', requireAuth, reqBookSpotImageAuth, async (req, res) => {

    const imgId = req.params.imageId;
    const img = await SpotImage.findByPk(imgId);

    await img.destroy();

    res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;
