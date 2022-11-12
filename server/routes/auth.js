const express = require("express");
const router = express.Router();
const { reset, logins, logout } = require("../Controller/auth");
const { login } = require("../validations/auth.validation");
const validateRequest = require("../validations/validateRequest");
const { protect } = require("../middleware/verifyToken");

router.post("/login", validateRequest(login), logins); //corrected
router.put("/reset-password", validateRequest(login), reset); //corrected
router.post("/logout", protect, logout);

module.exports = router;
