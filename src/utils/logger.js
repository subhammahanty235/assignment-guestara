const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({ 
      filename: 'assignment-proj-err.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'combined-logs.log' 
    })
  ]
});

module.exports = logger;