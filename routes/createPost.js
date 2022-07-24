const express = require("express");
const router = express.Router();
const post_controller = require("../controllers/postController");

router.get("/", post_controller.createpost_get);

router.post("/", post_controller.createpost_post);

module.exports = router;
