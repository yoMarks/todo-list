const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  originalName: {
    type: String,
    required: true,
  },

  storedName: {
    type: String,
    required: true,
  },

  path: {
    type: String,
    required: true,
  },

  mimeType: {
    type: String,
  },

  size: {
    type: Number,
  },

  todo: {
    type: Schema.Types.ObjectId,
    ref: "Todo",
    default: null,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", FileSchema);