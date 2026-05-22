const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Listar todos
router.get("/", todoController.todo_list);

// Crear
router.post("/", todoController.todo_create);

// Actualizar
router.put("/:id", todoController.todo_update);

// Eliminar
router.delete("/:id", todoController.todo_delete);

module.exports = router;