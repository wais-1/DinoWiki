const express = require('express');
const router = express.Router();
const pool = require('../db');
const upload = require('../middleware/upload');

// Получить все карточки
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM dino_card');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить страницу динозавра по id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM dino_page WHERE id = ?',
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'Не найден' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать карточку
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2x', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        dino_name,
        mini_description,
        dino_page_id
      } = req.body;

      const image =
        req.files?.image?.[0]?.filename || null;

      const image2x =
        req.files?.image2x?.[0]?.filename || null;

      const [result] = await pool.query(
        `INSERT INTO dino_card
        (
          dino_page_id,
          favorite_status,
          mini_description,
          dino_name,
          dino_card_img,
          dino_card_img_2x
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          dino_page_id,
          'none',
          mini_description,
          dino_name,
          image,
          image2x
        ]
      );

      res.json({
        id: result.insertId
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;