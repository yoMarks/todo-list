const mongoose = require("mongoose");//import
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  originalName: { type: String, required: true, },
  storedName: { type: String, required: true, },//nombre guard evita rep
  path: { type: String, required: true, },//ruta
  mimeType: { type: String, }, //tipo
  size: { type: Number, }, //tam arch
  todo: { type: Schema.Types.ObjectId, ref: "Todo", default: null, }, //ref a la tarea
  uploadedAt: { type: Date, default: Date.now, }, //fecha sub arch
});

module.exports = mongoose.model("File", FileSchema);