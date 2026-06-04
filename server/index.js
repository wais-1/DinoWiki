const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ 
  origin: ['http://localhost:5173', 'https://wais-1.github.io'] 
}));
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth',  require('./routes/auth'));
app.use('/api/dinoCard', require('./routes/dinoCard'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));