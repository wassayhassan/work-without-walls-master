const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/verifyToken");
const {addNewBid, deleteBid, getOffersById} = require("../Controller/bid.controller");
const { route } = require("./messages");

router.post('/addnew', protect, addNewBid);
router.delete("/deletebid/:id", protect, deleteBid);
router.get("/getbyid/:id", getOffersById);

module.exports = router;