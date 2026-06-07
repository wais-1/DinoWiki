// const express = require('express')
// const router = express.Router()
// const pool = require('../db')
// const jwt = require('jsonwebtoken')

// /**
//  * AUTH middleware
//  */
// const auth = (req, res, next) => {
//   try {
//     const header = req.headers.authorization

//     if (!header) {
//       return res.status(401).json({ error: 'No token' })
//     }

//     const token = header.split(' ')[1]
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)

//     req.user = decoded
//     next()
//   } catch (err) {
//     return res.status(401).json({ error: 'Invalid token' })
//   }
// }

// router.get('/', auth, async (req, res) => {
//   try {
//     const userId = req.user.id

//     const [userRows] = await pool.query(
//       `SELECT browsing_history_id FROM registered_user WHERE id = ?`,
//       [userId]
//     )

//     const historyId = userRows[0]?.browsing_history_id

//     if (!historyId) {
//       return res.json([])
//     }

//     const [rows] = await pool.query(
//       `
//       SELECT
//         bhc.id,
//         bhc.created_at,

//         dc.id AS dino_id,
//         dc.dino_name,
//         dc.mini_description,
//         dc.dino_card_img,
//         dc.dino_card_img_2x,
//         dc.favorite_status,

//         dp.dino_page_id,
//         dp.dino_location,
//         dp.dino_period,
//         dp.dino_food
//       FROM browsing_history_card bhc

//       INNER JOIN dino_card dc
//         ON bhc.dino_id = dc.id

//       INNER JOIN dino_page dp
//         ON dc.dino_page_id = dp.id

//       WHERE bhc.browsing_history_id = ?

//       ORDER BY bhc.created_at DESC
//       `,
//       [historyId]
//     )

//     res.json(rows)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// router.post('/', auth, async (req, res) => {
//   try {
//     const userId = req.user.id
//     const { dino_id } = req.body

//     if (!dino_id) {
//       return res.status(400).json({ error: 'dino_id is required' })
//     }

//     const [userRows] = await pool.query(
//       `SELECT browsing_history_id FROM registered_user WHERE id = ?`,
//       [userId]
//     )

//     let historyId = userRows[0]?.browsing_history_id

//     // если истории нет — создаём
//     if (!historyId) {
//       const [insertHistory] = await pool.query(
//         `INSERT INTO browsing_history () VALUES ()`
//       )

//       historyId = insertHistory.insertId

//       await pool.query(
//         `UPDATE registered_user SET browsing_history_id = ? WHERE id = ?`,
//         [historyId, userId]
//       )
//     }

//     // добавляем карточку в историю
//     await pool.query(
//       `
//       INSERT INTO browsing_history_card
//         (browsing_history_id, dino_id)
//       VALUES (?, ?)
//       `,
//       [historyId, dino_id]
//     )

//     res.json({ success: true })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// router.delete('/', auth, async (req, res) => {
//   try {
//     const userId = req.user.id

//     const [userRows] = await pool.query(
//       `SELECT browsing_history_id FROM registered_user WHERE id = ?`,
//       [userId]
//     )

//     const historyId = userRows[0]?.browsing_history_id

//     if (!historyId) {
//       return res.json({ success: true })
//     }

//     await pool.query(
//       `DELETE FROM browsing_history_card WHERE browsing_history_id = ?`,
//       [historyId]
//     )

//     res.json({ success: true })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })