const express = require('express');
const db = require('../db');
const TimeEntryManager = require('../classes/TimeEntryManager');

const router = express.Router();
const manager = new TimeEntryManager();

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

    const response = {
      id: Number(result.insertId),
      workerId,
      type,
      datetime: now,
      sessionHours: '0h',
      totalHours : 0
    };

    if (type === "Clock-Out") {
        const timeEntries = await manager.createTimeEntries(workerId);

        const currentEntry = timeEntries[timeEntries.length - 1];

        const sessionHours = currentEntry ? getHoursString(currentEntry.calculateHours()) : 0
        const totalHours = getHoursString(manager.getTotalHours(timeEntries));
        
        response.sessionHours = sessionHours;
        response.totalHours = totalHours;
    }

    res.status(201).json(response);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al registrar el fichaje'
    });
  }
});

outer.get('/', async (req, res) => {
  try {
    const timeLogs = await db.query(
      'SELECT * FROM \`time-logs\`'
    );

    res.json(timeLogs);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al obtener los fichajes'
    });
  }
});

function getHoursString(difference) {
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return(`${hours}h ${minutes}min`);
}
module.exports = router;