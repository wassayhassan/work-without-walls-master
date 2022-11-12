const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/verifyToken");

const {createReview, getReviewsByUserId} = require('../Controller/reviewController');


router.get('/user/:id', protect, getReviewsByUserId);
router.post('/create', protect, createReview);

module.exports = router;