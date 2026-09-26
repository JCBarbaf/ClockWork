const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const workers = await db.query(
      'SELECT * FROM workers'
    );

    res.json(workers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al obtener los trabajadores'
    });
  }
});
router.get('/:employeeCode', async (req, res) => {
    try {
        const { employeeCode } = req.params;

        const workers = await db.query(
            `SELECT * FROM workers WHERE employee_code = ?`,
        [employeeCode]
        );

        if (workers.length === 0) {
            return res.status(404).json({
                error: 'Trabajador no encontrado'
            });
        }

        const worker = workers[0];

        const logs = await db.query(
            `SELECT type, datetime
             FROM \`time-logs\`
             WHERE worker_id = ?
             ORDER BY datetime DESC
             LIMIT 1`,
             [worker.id]
            
        );
        

        const lastLog = logs.length > 0
            ? logs[0]
            : null;
            

        let nextAction = 'Clock-In';

        if (lastLog && lastLog.type === 'Clock-In') {
            nextAction = 'Clock-Out';
        }

        res.json({
            worker,
            lastLog,
            nextAction
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Error al consultar el trabajador'
        });
    }
});

module.exports = router;