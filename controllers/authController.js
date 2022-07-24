const User = require("../models/users");
const { body, check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const signupValidate = [
  // Check username is a valid email address
  body("email", "Must be a valid email address")
    .exists()
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage(" Password must be 8 characters long")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .matches("[A-Z]")
    .withMessage("Password Must Contain an Uppercase Letter")
    .trim()
    .escape(),
];

(exports.signup_post_new = [
  check("email").isEmail(),
  check("password").isLength({ min: 5 }),
]),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ERROR!");
      return res.render("/", { errors: errors.array() });
    } else {
      return next();
    }
  };

exports.signup_post = [
  // Check username is a valid email address
  body("email", "Must be a valid email address")
    .exists()
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage(" Password must be 8 characters long")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .matches("[A-Z]")
    .withMessage("Password Must Contain an Uppercase Letter")
    .trim()
    .escape(),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.array() });
    } else {
      const hashedPassword = bcrypt.hash(
        req.body.password,
        10,
        (err, hashedPassword) => {
          if (err) {
            next(err);
          }
          const user = new User({
            username: req.body.email,
            password: hashedPassword,
          }).save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/");
          });
        }
      );
    }
  },
];

exports.signup_get = (req, res, next) => {
  res.render("signup");
};
