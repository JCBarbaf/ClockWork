class TimeEntry{
    constructor(workerID, clockIn, clockOut){
        this.workerID = workerID;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
    }
    calculateHours(){
        if(this.clockOut < this.clockIn){
             throw new Error('La salida no puede suceder antes que la entrada.');
        }
        const difference = this.clockOut - this.clockIn;
        const result = difference;
        return result;
    }

}
module.exports = TimeEntry;