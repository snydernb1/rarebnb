const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots'); //need to change the require path
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const spotImagesRouter = require('./spot-images');
const reviewImagesRouter = require('./review-images');

const { setTokenCookie,restoreUser,requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


router.use(restoreUser);

// console.log('in api router');


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/review-images', reviewImagesRouter);


// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
// });


// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// });


// router.get('/set-token-cookie', async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({user: user, message: 'successful'});
// });


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
