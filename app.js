const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("./passport");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const section2Router = require("./routes/section2");
const section3Router = require("./routes/section3");

app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/evident",
      collectionName: "sessions",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes from here

app.use("/section2", section2Router);
app.use("/section3", section3Router);

app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/register", async (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("Email already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.session.userEmail = req.user.email;
    res.redirect("/section2");
  }
);

module.exports = app;
