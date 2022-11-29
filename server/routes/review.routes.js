const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/verifyToken");

const {createReview, getReviewsByUserId, getReviewsByOrderId, getReviewById,  getReviewsByTeamId} = require('../Controller/reviewController');


router.get('/user/:id', protect, getReviewsByUserId);
router.post('/create/order/:id', protect, createReview);
router.get('/order/:id', protect, getReviewsByOrderId);
router.get('/:id', protect, getReviewById);
router.get('/team/:id', protect,  getReviewsByTeamId);

module.exports = router;