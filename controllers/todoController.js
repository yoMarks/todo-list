const Todo = require("../models/todo");

// Listar todos los todos
exports.todo_list = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ date: -1 }).exec();
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

// Crear un todo nuevo
exports.todo_create = async (req, res, next) => {
  try {
    const todo = new Todo({ description: req.body.description });
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// Actualizar un todo
exports.todo_update = async (req, res, next) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { description: req.body.description, done: req.body.done },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Eliminar un todo
exports.todo_delete = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};