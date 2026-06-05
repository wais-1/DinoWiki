const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM dino_card');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM dino_page WHERE id = ?',
      [req.params.id]
    )
    if (!rows.length) return res.status(404).json({ error: 'Не найден' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
    const {
        dino_name,
        mini_description,
        dino_page_id
    } = req.body

    try {
        const [result] = await pool.query(
            `INSERT INTO dino_card
            (
                dino_page_id,
                favorite_status,
                mini_description,
                dino_name
            )
            VALUES (?, ?, ?, ?)`,
            [
                dino_page_id,
                'none',
                mini_description,
                dino_name
            ]
        )

        res.json({
            id: result.insertId
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

module.exports = router;