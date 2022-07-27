const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");

router.get("/", auth_controller.logout_get);

module.exports = router;
