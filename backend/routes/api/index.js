const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots'); //need to change the require path dumby
const { setTokenCookie,restoreUser,requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


router.use(restoreUser);

console.log('in api router');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);


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
