const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAith } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

console.log('in spots router');

//GET all spots
router.get('/', async (req, res) => {

    const data = await Spot.findAll();

    const revData = await data.getReview()



    return res.json({
        Spots: revData
    });
});


module.exports = router;
