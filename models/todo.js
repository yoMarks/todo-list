//decir a moogose como es
const mongoose = require("mongoose"); //import
const Schema = mongoose.Schema;

const TodoSchema = new Schema({//planilla
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  done: { type: Boolean, default: false }
});

TodoSchema.virtual("url").get(function() { //crear campo virtual url
  return `/todos/${this._id}`;              //ruta que genera
});

module.exports = mongoose.model("Todo", TodoSchema); //convertir squema a modelo