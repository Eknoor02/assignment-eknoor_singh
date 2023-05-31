const express = require("express");
const { registerUser, loginUser, updateUserProfile } = require("../controllers/userController.js");
const isAuthenticated = require("../middleware/auth.js")
const router = express.Router();

//user
router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/me/update").put(isAuthenticated, updateUserProfile)

module.exports = router