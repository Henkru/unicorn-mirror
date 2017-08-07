import * as winston from 'winston';
import moment from 'moment';

export default moduleName => new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: () => moment().format(),
      formatter: (options) => {
        const header = `[${options.timestamp()}] [${moduleName}] ${options.level.toUpperCase()}:`;
        const headerColorized = winston.config.colorize(options.level, header);

        const message = (undefined !== options.message ? options.message : '');
        const meta = (options.meta && Object.keys(options.meta).length ? `\n\t${JSON.stringify(options.meta)}` : '');

        return `${headerColorized} ${message}${meta}`;
      },
    }),
  ],
});
