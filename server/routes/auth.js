const router = require('express').Router();
const { login, signup, refreshToken } = require('../controllers/userController');

router.post('/login', login);
router.post('/signup', signup);
router.get('/refresh', refreshToken);
// router.get('/logout/:id', logOut);

module.exports = router;
