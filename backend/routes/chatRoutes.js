const express = require("express");
const {protect} = require("../middleware/authMiddleware")

const { fetchChats, accessChat, createGroup, addToGroup, removeFromGroup, renameGroup } = require("../controllers/chatControllers")

const router = express.Router();

router.route("/").get(protect,fetchChats);
router.route("/").post(protect,accessChat);
router.route("/creategroup").post(protect,createGroup);
router.route("/addgroup").put(protect,addToGroup);
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/grouprename").put(protect,renameGroup);

module.exports = router;