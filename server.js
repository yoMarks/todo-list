require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const todoRouter = require("./routes/todo");
const fileRouter = require("./routes/file");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use("/todos", todoRouter);
app.use("/files", fileRouter);

// Conexión a MongoDB
const mongoDB = process.env.MONGODB_URI;

mongoose
  .connect(mongoDB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Manejo de errores
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});