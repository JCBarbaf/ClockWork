const TimeEntry = require('./TimeEntry');
class TimeEntryManager {

    createTimeEntries(timeLogs) {
        
        const timeLogs = await db.query(`
    SELECT *
    FROM \`time-logs\`
    WHERE worker_id = ?
    ORDER BY datetime ASC
`, [workerId]);
        // emparejar Clock-In con Clock-Out
        // crear TimeEntry
    }

    getTotalHours(timeEntries) {
        // sumar las horas
    }
}

module.exports = TimeEntryManager;