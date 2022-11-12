const express = require('express');
const router = express.Router();
const { Mess } = require('../Controller/home');
router.post('/', Mess);

module.exports = router;
