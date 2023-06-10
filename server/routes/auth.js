const router = require('express').Router();
const { login, signup } = require('../controllers/userController');

router.post('/login', login);
router.post('/signup', signup);
// router.get('/allUsers/:id', getAllUsers);
// router.post('/avatar/:id', setAvatar);
// router.get('/logout/:id', logOut);

module.exports = router;
