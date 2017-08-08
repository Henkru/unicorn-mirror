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
      const backend = backends[module];
      log.silly('Received notification from [%s:%s] with data:', module, sender, data);

      if (backend) {
        if (backend.running) {
          const response = backend.module.receiveNotification(sender, data);

          // There might be cases when a module just return a data without Promise
          Promise.resolve(response)
            .then((res) => {
              log.silly('Response to [%s:%s] with data', module, sender, res);

              sck.emit(`notification_${sender}`, {
                module,
                sender,
                data: res,
              });
            })
            .catch((err) => {
              backend.crashCount = backend.crashCount + 1;
              if (backend.crashCount >= config.crashTreshold) {
                backend.running = false;
                log.warn('Disabled module %s: too many (%i) crashes', module, backend.crashCount);
              }

              log.error('Module %s crashed: %s', module, err);
            });
        }
      }
      else {
        log.error('Module %s does not contain the backend', module);
      }
    });
  });
};
