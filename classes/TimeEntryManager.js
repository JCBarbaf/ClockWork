const db = require('../db');
const TimeEntry = require('./TimeEntry');

class TimeEntryManager {
    async createTimeEntries(workerId) {
        const logs = await db.query(`
            SELECT *
            FROM \`time-logs\`
            WHERE worker_id = ?
            ORDER BY datetime ASC
        `, [workerId]);

        const timeEntries = [];
        let currentClockIn = null;

        for (const log of logs) {
            const logDate = new Date(log.datetime);

            if (log.type === 'Clock-In') {
                currentClockIn = logDate;
            } else if (log.type === 'Clock-Out' && currentClockIn) {
                const entry = new TimeEntry(workerId, currentClockIn, logDate);
                timeEntries.push(entry);

                currentClockIn = null;
            }
        }

        return timeEntries;
    }

    
    getTotalHours(timeEntries) {
        if (!Array.isArray(timeEntries) || timeEntries.length === 0) {
            return 0;
        }

        return timeEntries.reduce((total, entry) => {
            return total + entry.calculateHours();
        }, 0);
    }
}

module.exports = TimeEntryManager;