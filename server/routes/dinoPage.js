const express = require('express')
const router = express.Router()
const pool = require('../db')

router.post('/', async (req, res) => {
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
        dino_food
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        food_type
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

module.exports = router