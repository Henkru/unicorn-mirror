import * as winston from 'winston';
import moment from 'moment';
import config from './config';

if (!config.prod) {
  winston.level = 'debug';
}

// Overwrite logging level if LOGGING_LEVEL env is presented
winston.level = process.env.LOGGING_LEVEL || winston.level;

export default moduleName => new (winston.Logger)({
  level: winston.level,
  transports: [
    new (winston.transports.Console)({
      timestamp: () => moment().format(),
      formatter: (options) => {
        const header = `[${options.timestamp()}] [${moduleName}] ${options.level.toUpperCase()}:`;
        const headerColorized = winston.config.colorize(options.level, header);

        const message = options.message ? options.message : '';
        const meta = (options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta, null, 2)}` : '');

        return `${headerColorized} ${message}${meta}`;
      },
    }),
  ],
});
