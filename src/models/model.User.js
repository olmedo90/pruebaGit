const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nombre:  String,
  edad: Number,
  email:String

},{
  versionKey: false
});

// Crear el modelo
const UserModel = mongoose.model('clientes', UserSchema);// clientes nombre de la coleccion

module.exports = UserModel;