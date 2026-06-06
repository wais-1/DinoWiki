const express = require('express')
const router = express.Router()
const pool = require('../db')
const upload = require('../middleware/upload')
const cloudinary = require('../config/cloudinary')

// Получить страницу по id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM dino_page WHERE id = ?',
      [req.params.id]
    )

    if (!rows.length) {
      return res.status(404).json({
        error: 'Страница не найдена'
      })
    }

    res.json(rows[0])

  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

// Создать страницу
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2x', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        name,
        length,
        habitat_period,
        family,
        appearance,
        lifestyle,
        height,
        weight,
        nutrition,
        dino_type,
        dino_location,
        dino_period,
        food_type
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
        `INSERT INTO dino_page
        (
          name,
          length,
          habitat_period,
          family,
          appearance,
          lifestyle,
          height,
          weight,
          nutrition,
          dino_type,
          dino_location,
          dino_peripd,
          dino_food,
          dino_page_img,
          dino_page_img_2x
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          length,
          habitat_period,
          family,
          appearance,
          lifestyle,
          height,
          weight,
          nutrition,
          dino_type,
          dino_location,
          dino_period,
          food_type,
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

module.exports = router