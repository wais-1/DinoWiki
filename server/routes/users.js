const express = require('express');
const router = express.Router();

const pool = require('../db')

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT user_id, user_email FROM registered_user')
        res.json(rows)
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
})

router.post('/', async (req, res) => {
    const { email, password } = req.body
    try {
        const [result] = await pool.query(
            'INSERT INTO registered_user (user_email, user_password) VALUES (?, ?)',
            [email, password]
        )
        res.json({ user_id: result.insertId, user_email: email })
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router