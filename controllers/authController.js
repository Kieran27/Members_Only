const User = require("../models/userModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const signupValidate = [];

exports.signup_get = (req, res, next) => {
  res.render("signup_form", { title: "Sign Up" });
};
