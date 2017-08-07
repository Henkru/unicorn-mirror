import logger from './logger';
import config from './config';

const log = logger('backend');

export default (io, backends) => {
  io.on('connection', (sck) => {
    log.info('Client connected');

    sck.on('disconnect', () => {
      log.info('Client disconnected');
    });

    sck.on('notification', (msg) => {
      const { module, sender, data } = msg;

      if (backends[module]) {
        const backend = backends[module];

        if (backend.running) {
          try {
            backend.module.receiveNotification(sender, data, (res) => {
              sck.emit(`notification_${sender}`, {
                module,
                sender,
                data: res,
              });
            });
          }
          catch (e) {
            backend.crashCount = backend.crashCount + 1;
            if (backend.crashCount >= config.crashTreshold) {
              backend.running = false;
              log.warn('Disabled module %s: too many crashes', module);
            }

            log.error('Module %s crashed: %s', module, e);
          }
        }
      }
      else {
        log.error('Module %s does not contain the backend', module);
      }
    });
  });
};
