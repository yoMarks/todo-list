//L
const Todo = require("../models/todo");

// Listar todo
exports.todo_list = async (req, res, next) => { //expor funcion  caso de rutas /req peticion que llega, /res respuesta enviar /next pasar error al manejado
  try {       //con puede fallar
    const todos = await Todo.find().sort({ date: -1 }).exec(); //asyn espera op asincronads /await esperar respuesta
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

// Crear nuevo
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
    });

    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// Editar texto PUT
exports.todo_actualizar_texto = async (req, res, next) => {
  try {
    const { description } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        error: "La descripción es obligatoria",
      });
    }

    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
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
        error: "Tarea no encontrada",
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Actualizar estado PATCH
exports.todo_actualizar_hecho = async (req, res, next) => {
  try {
    const { done } = req.body;

    if (typeof done !== "boolean") {
      return res.status(400).json({
        error: "El campo done debe ser true o false",
      });
    }

    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
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
        error: "Tarea no encontrada",
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Eliminar
exports.todo_delete = async (req, res, next) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Tarea no encontrada",
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};