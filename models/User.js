const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');

//esquema de usuarios
const userSchema = new Schema({
    Proveedor:{type:String, unique:true, required:true},
    Velocidad:{type:String, required:true},
    Calidad: {type:String, required:true},
    Precio: {type:String, enum:['$55.00','$25.00','$12.00']},
});

//encriptar contraseñas
userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};

module.exports = mongoose.model('users',userSchema);