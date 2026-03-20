const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'El nombre de usuario ya está registrado.' });
        }

        user = new User({
            username,
            password 
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        
        res.status(201).json({ msg: 'Usuario registrado exitosamente. Ya puedes iniciar sesión.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor durante el registro.');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas.' });
        }

        res.json({ msg: 'Inicio de sesión exitoso.', user: { id: user._id, username: user.username } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor durante el login.');
    }
});

module.exports = router;