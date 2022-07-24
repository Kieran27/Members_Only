const express = require("express");
const Message = require("../models/messages");
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const messages = await Message.find();
  console.log(messages);
  res.render("index", {
    title: "Express",
    messages: messages,
  });
});

module.exports = router;
