const express = require("express");
const router = express.Router();
const  {createActivity, getActivitiesByOrderId} = require("../Controller/orderActivityController");
const { protect } = require("../middleware/verifyToken");

router.post('/create', createActivity)
router.get('/:id', protect, getActivitiesByOrderId);

module.exports = router