const express = require("express");
const auth = require("../src/middleware/auth");
const router = new express.Router();
const authController = require("../controllers/authController");

//create new tokens
router.post("/refresh-token", auth, authController.renewTokens);

module.exports = router;
