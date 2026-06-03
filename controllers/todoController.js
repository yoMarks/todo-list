//L
const Todo = require("../models/todo"); //Todo.find()...
const fs = require("fs"); //trabajar con arc del sistem
const path = require("path"); //convertir a rut apsoluta
const File = require("../models/file"); //repre archivos guard en mongoDB

// Listar todo
exports.todo_list = async (req, res, next) => { //expor funcion  caso de rutas /req peticion client, /res respuesta enviar al cliente /next pasar error al manejado
  try {       //con puede fallar
    const todos = await Todo.find().sort({ date: -1 }).exec(); //
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
      return res.status(400).json({//vacio
        error: "La descripción es obligatoria",
      });
    }

    const todo = new Todo({
      description: description.trim(),
      date: new Date(),
      done: false,
    });

    const saved = await todo.save();
    res.status(201).json(saved);//201 creado
  } catch (err) {
    next(err);
  }
};

// Editar texto PUT
exports.todo_actualizar_texto = async (req, res, next) => {
  try {
    const { description } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({//esta vacio
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
        new: true, //dev doc atualizado
        runValidators: true,//app val
      }
    );

    if (!updated) {
      return res.status(404).json({ //no existe tarea con ese id
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
    const todo = await Todo.findById(req.params.id).exec();

    if (!todo) {
      return res.status(404).json({//no encontrado
        error: "Tarea no encontrada",
      });
    }

    // Buscar archivos vinculados a esta tarea
    const files = await File.find({ todo: todo._id }).exec();

    // Eliminar archivos físicos de la carpeta uploads
    for (const file of files) {
      const filePath = path.resolve(file.path);//convierte en rut absoluta

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Eliminar registros de archivos en MongoDB
    await File.deleteMany({ todo: todo._id });

    // Eliminar la tarea
    await Todo.findByIdAndDelete(todo._id);

    res.json({
      message: "Tarea y archivos vinculados eliminados correctamente",
    });
  } catch (err) {
    next(err);
  }
};