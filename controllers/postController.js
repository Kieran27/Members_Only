const Message = require("../models/messages");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const { locals } = require("../app");

exports.createpost_post = [
  //Sanitize inputs
  body("posttitle").exists().trim().escape(),
  body("postbody").exists().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.user);
    const message = new Message({
      title: req.body.posttitle,
      content: req.body.postbody,
      createdAt: Date.now(),
      author: req.user.username,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },
];

exports.createpost_get = (req, res, next) => {
  res.render("createpost");
};
