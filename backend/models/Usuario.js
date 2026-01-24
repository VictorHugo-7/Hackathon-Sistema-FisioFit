import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const usuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

usuarioSchema.plugin(uniqueValidator);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;