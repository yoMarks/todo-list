const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");              //react conect backend
const todoRouter = require("./routes/todo");

const app = express();

// Middleware
app.use(morgan("dev")); //muestra pet consol
app.use(bodyParser.json()); //leer json
app.use(cors());            //desde react

// manejo Rutas
app.use("/todos", todoRouter);

// Conexión a MongoDB
const mongoDB = "mongodb://cristianheredia789:xCBZzUimMBpDg1VB@ac-txyqq3e-shard-00-00.tezv4kp.mongodb.net:27017,ac-txyqq3e-shard-00-01.tezv4kp.mongodb.net:27017,ac-txyqq3e-shard-00-02.tezv4kp.mongodb.net:27017/?ssl=true&replicaSet=atlas-fre8kn-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(mongoDB)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Manejo de errores, rutas,contrladores
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000; //def puerto
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  //escuch peticiones