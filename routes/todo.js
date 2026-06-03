const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");//importar sus funciones
const fileController = require("../controllers/fileController");
const upload = require("../middlewares/upload");

// Listar todos
router.get("/", todoController.todo_list);

// Crear
router.post("/", todoController.todo_create);//f

// Subir archivo a una tarea
router.post("/:id/upload", upload.single("document"), fileController.file_upload_to_todo);

// Listar archivos de una tarea
router.get("/:id/files", fileController.file_list_by_todo);

// Editar solo texto
router.put("/:id", todoController.todo_actualizar_texto);

// Actualizar estado hecho/no hecho
router.patch("/:id", todoController.todo_actualizar_hecho);

// Eliminar
router.delete("/:id", todoController.todo_delete);

module.exports = router; //expor para usar ser.js