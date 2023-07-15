const router = require('express').Router();
const { setAvatar } = require('../controllers/userController');

// router.get('/allUsers/:id', getAllUsers);
router.post('/setavatar/:id', setAvatar);

module.exports = router;
