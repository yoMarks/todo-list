//cofig passport con estrategia usuario y contraseña

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;//import estrategia local

const User = require("../models/user");

passport.use( //uso de estrategia local
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          email: email.toLowerCase(),
        });

        if (!user) {
          return done(null, false, {
            message: "El correo no está registrado",
          });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
          return done(null, false, {
            message: "La contraseña es incorrecta",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;