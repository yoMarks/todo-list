const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Nombre, correo y contraseña son obligatorios",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    const userExists = await User.findOne({
      email: email.toLowerCase(),
    });

    if (userExists) {
      return res.status(400).json({
        error: "Ese correo ya está registrado",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = createToken(user);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginSuccess = async (req, res, next) => {
  try {
    const token = createToken(req.user);

    res.json({
      message: "Login correcto",
      token,
      user: req.user,
    });
  } catch (error) {
  res.status(500).json({
    error: error.message,
  });
}
};

exports.profile = async (req, res) => {
  res.json({
    message: "Perfil del usuario autenticado",
    user: req.user,
  });
};