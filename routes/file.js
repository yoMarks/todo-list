const express = require("express");
const router = express.Router();

const fileController = require("../controllers/fileController");
const upload = require("../middlewares/upload");

// Listar todos los archivos
router.get("/", fileController.file_list);

// Subir archivo general
router.post("/upload", upload.single("document"), fileController.file_upload_general);

// Descargar archivo por ID
router.get("/:id/download", fileController.file_download);

// Eliminar archivo por ID
router.delete("/:id", fileController.file_delete);

module.exports = router;