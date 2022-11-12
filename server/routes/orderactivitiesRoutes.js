const express = require("express");
const router = express.Router();
const  {createActivity, getActivitiesById} = require("../Controller/orderActivityController");
const { protect } = require("../middleware/verifyToken");

router.post('/create', protect, createActivity)
router.get('/:id', protect, getActivitiesById)

module.exports = router