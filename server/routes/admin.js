const express = require("express");


const { approve, deleteA } = require("../Controller/admin");

const router = express.Router();

router.put("/approve-user/:id", approve);
router.delete("/delete-user/:id", deleteA);

module.exports = router;
