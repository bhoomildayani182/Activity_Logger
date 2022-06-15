const { createLogger, format, transports }= require('winston')
const { combine, timestamp, printf } = format

const myFormet = printf(({ level, message, timestamp }) =>{
    return `[${level}] ${timestamp} ${message}`
})
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormet
    ),
    transports: [
        new transports.Console(),
      new transports.File({filename: 'myLogs.log'})
    ],
});



module.exports = logger