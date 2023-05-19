const express = require("express");
const {
  getAllData,filterData
} = require("../controller/nsCtrl");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/", getAllData);
router.post("/find",filterData);


module.exports = router;