const express = require("express");
const router = express.Router();
const { register } = require("../validations/auth.validation");
const User = require("../models/User");
const validateRequest = require("../validations/validateRequest");
const { protect } = require("../middleware/verifyToken");
const {
  signup,
  userUpdateHandler,
  getSingleUser,
  getUserById
} = require("../Controller/api");
router.post("/register", validateRequest(register), signup); //corrected
router.get("/", async (req, res) => {
  //corrected
  User.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error", error);
    });
});

router.put("/profile/:id([0-9a-fA-F]{24})", protect, userUpdateHandler);
router.get("/user", protect, getSingleUser); //corected
router.get('/user/:id', protect, getUserById);

module.exports = router;
