import logger from './logger';

const log = logger('backend');

export default function (io, backends) {
  io.on('connection', (sck) => {
    log.info('Client connected');

    sck.on('disconnect', () => {
      log.info('Client disconnected');
    });

    sck.on('notification', (msg) => {
      const { module, sender, data } = msg;

      if (backends[module] && backends[module].receiveNotification) {
        try {
          backends[module].receiveNotification(sender, data, (res) => {
            sck.emit(`notification_${sender}`, {
              module,
              sender,
              data: res,
            });
          });
        } catch (e) {
          log.error('Module %s crashed: %s', module, e);
        }
      } else {
        log.error('Module %s does not contain the backend', module);
      }
    });
  });
}
