const router = require("express").Router();
const { setAvatar, getAllUsers } = require("../controllers/userController");
const {
  getAllMessages,
  addMessage,
} = require("../controllers/messageController");

router.get("/allusers", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/allMsgs", getAllMessages);
router.post("/addMsg", addMessage);

module.exports = router;
