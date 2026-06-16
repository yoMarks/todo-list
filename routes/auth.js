const express = require("express");
const router = express.Router();

const passport = require("../config/passport");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Registrar usuario
router.post("/register", authController.register);

// Login con Passport local
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        error: info?.message || "Credenciales inválidas",
      });
    }

    req.user = user;
    return authController.loginSuccess(req, res, next);
  })(req, res, next);
});

// Perfil protegido
router.get("/profile", verifyToken, authController.profile);

module.exports = router;