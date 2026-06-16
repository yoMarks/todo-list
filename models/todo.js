// decir a mongoose cómo es una tarea
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  done: {
    type: Boolean,
    default: false,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

TodoSchema.virtual("url").get(function () {
  return `/todos/${this._id}`;
});

module.exports = mongoose.model("Todo", TodoSchema);