const express = require("express");
const { getAllarticles, createarticle } = require("../controllers/articleController.js");
const isAuthenticated = require("../middleware/auth.js")
const router = express.Router();

router.route("/articles/new").post(isAuthenticated, createarticle);
router.route("/articles").get(getAllarticles);

module.exports = router