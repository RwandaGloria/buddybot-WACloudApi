const winston = require('winston');
const { format } = winston;

const logger = winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'user-service' },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json()
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
    })
  );
}

module.exports = logger;
