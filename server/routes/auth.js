const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

// Регистрация
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO registered_user (user_email, user_password) VALUES (?, ?)',
      [email, hash]
    );
    res.json({ message: 'Зарегистрирован', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Логин
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM registered_user WHERE user_email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Пользователь не найден' });

    const valid = await bcrypt.compare(password, rows[0].user_password);
    if (!valid) return res.status(401).json({ error: 'Неверный пароль' });

    const token = jwt.sign(
      { id: rows[0].user_id, role: rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: rows[0].user_id, email: rows[0].user_email, role: rows[0].role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;