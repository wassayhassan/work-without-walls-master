const express = require("express");
const router = express.Router();
const {createNewOrder, getOrderById} = require("../Controller/orderController");
const { protect } = require("../middleware/verifyToken");
const {addDelivery} = require("../Controller/deliveryController");


router.post('/create', protect, createNewOrder);
router.get('/:id', protect, getOrderById)
router.post('/:id/delivery/add', protect, addDelivery);

module.exports = router;

