const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController.js");

router.get("/", auth_controller.signup_get);

router.post("/", auth_controller.signup_post);

module.exports = router;
