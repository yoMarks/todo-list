const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  done: { type: Boolean, default: false }
});

TodoSchema.virtual("url").get(function() {
  return `/todos/${this._id}`;
});

module.exports = mongoose.model("Todo", TodoSchema);