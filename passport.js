const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/users.model");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async (email, password, done) => {
    console.log("Inside pass use");
    try {
      const user = await User.findOne({ email: email }); //user data from database
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      if (!bcrypt.compare(password, user.password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(err);
    }
  })
);

// create session id
passport.serializeUser((user, done) => {
  console.log("Inside serializer");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
