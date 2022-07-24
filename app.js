const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Establish Database Connection
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// Import Routes
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const createPostRouter = require("./routes/createPost");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/sign-up", signupRouter);
app.use("/createpost", createPostRouter);

// Setup Local Strategy for Auth
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) return done(err);
        // Passwords match, log user in!
        if (res) return done(null, user);
        // Passwords do not match!
        else return done(null, false, { message: "Incorrect password" });
      });
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
