const express = require('express')
const router = express.Router()
const pool = require('../db')

/*
Добавить карточку в избранное
*/
router.post('/', async (req, res) => {
  try {
    const {
      dino_card_id,
      id_user
    } = req.body

    const [exists] = await pool.query(
      `
      SELECT *
      FROM favorite
      WHERE dino_card_id = ?
      AND id_user = ?
      `,
      [
        dino_card_id,
        id_user
      ]
    )

    if (exists.length) {
      return res.json({
        success: true,
        message: 'Уже в избранном'
      })
    }

    await pool.query(
      `
      INSERT INTO favorite
      (
        dino_card_id,
        id_user
      )
      VALUES (?, ?)
      `,
      [
        dino_card_id,
        id_user
      ]
    )

    res.json({
      success: true,
      message: 'Добавлено в избранное'
    })

  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: err.message
    })
  }
})

/*
Удалить из избранного
*/
router.delete('/', async (req, res) => {
  try {
    const {
      dino_card_id,
      id_user
    } = req.body

    await pool.query(
      `
      DELETE FROM favorite
      WHERE dino_card_id = ?
      AND id_user = ?
      `,
      [
        dino_card_id,
        id_user
      ]
    )

    res.json({
      success: true,
      message: 'Удалено из избранного'
    })

  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: err.message
    })
  }
})

/*
Проверка находится ли карточка в избранном
*/
router.get('/check/:userId/:cardId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM favorite
      WHERE id_user = ?
      AND dino_card_id = ?
      `,
      [
        req.params.userId,
        req.params.cardId
      ]
    )

    res.json({
      liked: rows.length > 0
    })

  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: err.message
    })
  }
})

/*
Все избранные карточки пользователя
*/
router.get('/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT d.*
      FROM favorite f
      INNER JOIN dino_card d
      ON d.id = f.dino_card_id
      WHERE f.id_user = ?
      `,
      [
        req.params.userId
      ]
    )

    res.json(rows)

  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router