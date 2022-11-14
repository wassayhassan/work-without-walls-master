const express = require('express');
const router = express.Router();
// const { protect } = require("../middleware/verifyToken");
const getMaterial = async(req, res) => {
    const rootPath = './';
    res.sendFile(`/uploads/${req.params.id}`, {root: rootPath});
}

router.get('/:id', getMaterial);
module.exports = router;