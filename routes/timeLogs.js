const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { workerId, type } = req.body;

    const now = new Date();

    const result = await db.query(
      `INSERT INTO \`time-logs\`
       (worker_id, type, datetime, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?)`,
      [workerId, type, now, now, now]
    );

    res.status(201).json({
      id: Number(result.insertId),
      workerId,
      type,
      datetime: now
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al registrar el fichaje'
    });
  }
});

module.exports = router;