const express = require("express");
const router = express.Router();
const {createNewOrder, getOrderById, updateOrder} = require("../Controller/orderController");
const { protect } = require("../middleware/verifyToken");
const {addDelivery, getDeliveriesByOrderId, getDeliveryById} = require("../Controller/deliveryController");
const {createNote, getNoteByOrderId, getNoteById, deleteNote} = require("../Controller/orderNotesController");

router.post('/create', protect, createNewOrder);
router.get('/:id', protect, getOrderById)
router.post('/:id/delivery/add', protect, addDelivery);
router.get('/:id/deliveries', protect, getDeliveriesByOrderId);
router.get('/delivery/:id', protect, getDeliveryById);
router.post('/:id/update', updateOrder);
router.get('/notes/:id', getNoteById);
router.get('/:id/notes', getNoteByOrderId);
router.post('/notes/create', createNote);
router.delete('/notes/:id', deleteNote)

module.exports = router;

