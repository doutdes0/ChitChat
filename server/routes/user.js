const router = require('express').Router();
const { setAvatar, getAllUsers } = require('../controllers/userController');

router.get('/allusers', getAllUsers);
router.post('/setavatar/:id', setAvatar);

module.exports = router;
