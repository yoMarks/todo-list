const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No autorizado. Token no enviado",
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        error: "No autorizado. Usuario no existe",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};