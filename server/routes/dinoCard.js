const express = require('express')
const router = express.Router()
const pool = require('../db')
const upload = require('../middleware/upload')
const cloudinary = require('../config/cloudinary')

// Все карточки
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM dino_card')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Одна карточка
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM dino_card WHERE id = ?',
      [req.params.id]
    )

    if (!rows.length) {
      return res.status(404).json({
        error: 'Карточка не найдена'
      })
    }

    res.json(rows[0])
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

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
      } = req.body

      let image = null
      let image2x = null

      if (req.files?.image?.[0]) {
        const result = await cloudinary.uploader.upload(
          `data:${req.files.image[0].mimetype};base64,${req.files.image[0].buffer.toString('base64')}`
        )

        image = result.secure_url
      }

      if (req.files?.image2x?.[0]) {
        const result = await cloudinary.uploader.upload(
          `data:${req.files.image2x[0].mimetype};base64,${req.files.image2x[0].buffer.toString('base64')}`
        )

        image2x = result.secure_url
      }

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
      )

      res.json({
        id: result.insertId
      })

    } catch (err) {
      console.error(err)
      res.status(500).json({
        error: err.message
      })
    }
  }
)

// Обновить карточку
router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2x', maxCount: 1 }
  ]),
  async (req, res) => {
    try {

      console.log(req.body)

      const {
        dino_name,
        mini_description,
        dino_page_id
      } = req.body

      await pool.query(
        `UPDATE dino_card
         SET
           dino_name = ?,
           mini_description = ?,
           dino_page_id = ?
         WHERE id = ?`,
        [
          dino_name,
          mini_description,
          dino_page_id,
          req.params.id
        ]
      )

      res.json({
        message: 'Карточка обновлена'
      })

    } catch (err) {
      console.error('UPDATE CARD ERROR:', err)

      res.status(500).json({
        error: err.message
      })
    }
  }
)

router.put('/favorite/:id', async (req, res) => {
  try {
    const { favorite_status } = req.body

    await pool.query(
      `UPDATE dino_card
       SET favorite_status = ?
       WHERE id = ?`,
      [
        favorite_status,
        req.params.id
      ]
    )

    res.json({
      success: true
    })

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router