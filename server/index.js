const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const path = require('path')

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/dinoCard', require('./routes/dinoCard'));
app.use('/api/dinoPage', require('./routes/dinoPage'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));