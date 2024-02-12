const { createLogger, format, transports } = require('winston');
const {loggerLevels, loggerFiles}  = require('../configs/logger.config');

const logger = createLogger({
    levels: loggerLevels.levels,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: loggerFiles.error, level: 'error' }),
      new transports.File({ filename: loggerFiles.warn, level: 'warn' }),
    //   new transports.File({ filename: loggerFiles.debug, level: 'debug' }),
      new transports.File({ filename: loggerFiles.info, level: 'info' }),
    ],
    level:'info'
  });
  module.exports = logger;