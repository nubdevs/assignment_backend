const express = require("express");
const {
  getAllData,
} = require("../controller/nsCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/", getAllData);


module.exports = router;