const mongoose = require("mongoose");
const bcrypt = require("bcrypt");//import bcrypt sirve cifrar y comparar

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, //quitar espacios
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, //para guardar minuscula
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//ejecuanta antes de guardar us cifra la contraseña
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const saltRounds = 10; //nivel seguridad
  this.password = await bcrypt.hash(this.password, saltRounds); //cifrar pass
});

// comparar contraseña ingresada con contraseña cifrada
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// oculta la contraseña cuando se devuelve el usuario en JSON
UserSchema.methods.toJSON = function () {
  const user = this.toObject(); //conv a Objeto
  delete user.password; //elimina password
  return user;
};

module.exports = mongoose.model("User", UserSchema);