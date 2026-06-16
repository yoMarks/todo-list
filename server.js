//levantar server
require("dotenv").config(); //leer variables entorno env.

const express = require("express"); // importa express
const mongoose = require("mongoose"); //conectar node conMoongoDB
const morgan = require("morgan"); //mostrar peticiones en consol
const bodyParser = require("body-parser"); //permite leer json postman o react
const cors = require("cors"); //coneccion con react
const todoRouter = require("./routes/todo");
const fileRouter = require("./routes/file");

const app = express();

// configuran Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors()); //permite a react llamar desde otro puerto

// conectan las rutas
app.use("/todos", todoRouter);
app.use("/files", fileRouter);

// Conexión a MongoDB
const mongoDB = process.env.MONGODB_URI;

mongoose
  .connect(mongoDB) //conect back con moDB
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));//falla ip, uri,internet

// Manejo de errores de controlle por next(err)
app.use((err, req, res, next) => {
  res.status(500).json({//err interno serv
    error: err.message,
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});//enciende servidor