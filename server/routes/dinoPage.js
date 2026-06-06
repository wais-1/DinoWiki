const express = require('express')
const router = express.Router()
const pool = require('../db')
const upload = require('../middleware/upload')

router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2x', maxCount: 1 }
  ]),
  async (req, res) => {
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

    try {
      const image =
        req.files?.image?.[0]?.filename || null

      const image2x =
        req.files?.image2x?.[0]?.filename || null

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