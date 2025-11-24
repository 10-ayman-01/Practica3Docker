const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const path = require('path');
const connectDB = require('./config/db'); 
const authRoutes = require('./src/routes/auth');

dotenv.config();

connectDB();

const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/api/auth', authRoutes); 

app.get('/dashboard', (req, res) => {
    res.send('<h1>✅ Dashboard Privado</h1><p>¡Has iniciado sesión con éxito! (Servido desde el Backend)</p><a href="http://localhost:8000">Volver al Login (Frontend)</a>');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🔥 Servidor Express escuchando en http://localhost:${PORT}`);
});