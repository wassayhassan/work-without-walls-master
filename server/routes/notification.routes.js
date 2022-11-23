const express = require("express");
const router = express.Router()

const {createNotification, updateNotification, getNotificationsByUserId} = require("../Controller/NotificationController");

router.post('/',createNotification);
router.put('/:id', updateNotification);
router.get('/:id', getNotificationsByUserId);

module.exports = router;