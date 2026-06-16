const Todo = require("../models/todo");
const fs = require("fs");
const path = require("path");
const File = require("../models/file");

// Listar solo tareas del usuario autenticado
exports.todo_list = async (req, res, next) => {
  try {
    const todos = await Todo.find({
      user: req.user._id,
    })
      .sort({ date: -1 })
      .exec();

    res.json(todos);
  } catch (err) {
    next(err);
  }
};

// Crear nueva tarea asociada al usuario autenticado
exports.todo_create = async (req, res, next) => {
  try {
    const { description } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        error: "La descripción es obligatoria",
      });
    }

    const todo = new Todo({
      description: description.trim(),
      date: new Date(),
      done: false,
      user: req.user._id,
    });

    const saved = await todo.save();

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// Editar solo texto de una tarea del usuario autenticado
exports.todo_actualizar_texto = async (req, res, next) => {
  try {
    const { description } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        error: "La descripción es obligatoria",
      });
    }

    const updated = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        description: description.trim(),
        date: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Tarea no encontrada o no pertenece al usuario",
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Actualizar estado hecho/no hecho de una tarea del usuario autenticado
exports.todo_actualizar_hecho = async (req, res, next) => {
  try {
    const { done } = req.body;

    if (typeof done !== "boolean") {
      return res.status(400).json({
        error: "El campo done debe ser true o false",
      });
    }

    const updated = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        done: done,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Tarea no encontrada o no pertenece al usuario",
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Eliminar una tarea del usuario autenticado
exports.todo_delete = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).exec();

    if (!todo) {
      return res.status(404).json({
        error: "Tarea no encontrada o no pertenece al usuario",
      });
    }

    // Buscar archivos vinculados a esta tarea y al usuario autenticado
    const files = await File.find({
      todo: todo._id,
      user: req.user._id,
    }).exec();

    // Eliminar archivos físicos de la carpeta uploads
    for (const file of files) {
      const filePath = path.resolve(file.path);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Eliminar registros de archivos en MongoDB
    await File.deleteMany({
      todo: todo._id,
      user: req.user._id,
    });

    // Eliminar la tarea
    await Todo.findOneAndDelete({
      _id: todo._id,
      user: req.user._id,
    });

    res.json({
      message: "Tarea y archivos vinculados eliminados correctamente",
    });
  } catch (err) {
    next(err);
  }
};