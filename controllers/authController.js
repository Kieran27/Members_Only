const User = require("../models/users");
const { body, check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("dotenv").config();

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

  body("username", "Must be a valid username")
    .isLength({ min: 8 })
    .withMessage(" Username must be 8 characters long!")
    .exists()
    .trim(),

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
            email: req.body.email,
            username: req.body.username,
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

exports.login_get = (req, res, next) => {
  res.render("login");
};

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  // failureFlash: true
});

exports.secret_get = (req, res, next) => {
  res.render("secret");
};

exports.secret_post = async (req, res, next) => {
  const passcode = process.env.SECRET_PASSCODE;
  console.log(res.locals.currentUser);
  if (req.body.passcode === passcode) {
    const user = await User.findByIdAndUpdate(res.locals.currentUser._id, {
      memberStatus: true,
    });
    res.redirect("/");
  } else {
    const error = "Wrong Passcode!";
    res.render("/secret", { error: error });
  }
};

exports.logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
