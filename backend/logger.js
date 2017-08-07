import * as winston from 'winston'
import moment from 'moment'

export default moduleName => new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: function() {
                return moment().format("")
            },
            formatter: function(options) {
                const header = `[${options.timestamp()}] [${moduleName}] ${options.level.toUpperCase()}:`

                return winston.config.colorize(options.level, header) +' '+ (undefined !== options.message ? options.message : '') +
                (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
            }
        })
    ]
})