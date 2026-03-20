const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'], 
        unique: true, 
        trim: true, 
        minlength: 3
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: 6 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('User', userSchema);