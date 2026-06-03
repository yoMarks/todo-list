const path = require("path");
const fs = require("fs");
const File = require("../models/file");
const Todo = require("../models/todo");

// Listar todos los archivos
exports.file_list = async (req, res, next) => {
  try {
    const files = await File.find()
      .populate("todo", "description done")
      .sort({ uploadedAt: -1 })
      .exec();

    res.json(files);
  } catch (err) {
    next(err);
  }
};

// Subir archivo general, sin asociarlo a una tarea
exports.file_upload_general = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Debes enviar un archivo con el campo document",
      });
    }

    const file = new File({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      todo: null,
    });

    const saved = await file.save();

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// Subir archivo asociado a una tarea
exports.file_upload_to_todo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id).exec();

    if (!todo) {
      return res.status(404).json({
        error: "Tarea no encontrada",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "Debes enviar un archivo con el campo document",
      });
    }

    const file = new File({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      todo: todo._id,
    });

    const saved = await file.save();

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// Listar archivos de una tarea
exports.file_list_by_todo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id).exec();

    if (!todo) {
      return res.status(404).json({
        error: "Tarea no encontrada",
      });
    }

    const files = await File.find({ todo: req.params.id })
      .sort({ uploadedAt: -1 })
      .exec();

    res.json(files);
  } catch (err) {
    next(err);
  }
};

// Descargar archivo
exports.file_download = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id).exec();

    if (!file) {
      return res.status(404).json({
        error: "Archivo no encontrado",
      });
    }

    const filePath = path.resolve(file.path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: "El archivo no existe en el servidor",
      });
    }

    res.download(filePath, file.originalName);
  } catch (err) {
    next(err);
  }
};

// Eliminar archivo
exports.file_delete = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id).exec();

    if (!file) {
      return res.status(404).json({
        error: "Archivo no encontrado",
      });
    }

    const filePath = path.resolve(file.path);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await File.findByIdAndDelete(req.params.id);

    res.json({
      message: "Archivo eliminado correctamente",
    });
  } catch (err) {
    next(err);
  }
};