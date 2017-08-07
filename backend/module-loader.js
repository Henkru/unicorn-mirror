import logger from './logger';
import config from './config';

const log = logger('loader');

let moduleBackends = {};

log.info('Loading backend modules');
config.user.modules.forEach((m) => {
  const moduleName = m.module;

  if (!moduleBackends[moduleName]) {
    try {
      const BackendClass = require(`../modules/${moduleName}/backend`).default;

      if (!BackendClass.constructor) {
        throw new Error('Module is not class');
      }

      try {
        const backend = {
          module: new BackendClass(m.settings || {}, logger(moduleName)),
          running: true,
          crashCount: 0,
        };

        moduleBackends = Object.assign({}, moduleBackends, { [moduleName]: backend });
        log.info('Module %s loaded', moduleName);
      } catch (e) {
        log.error('Failed to load module %s: %s', moduleName, e);
      }
    } catch (e) {
      log.info('Module %s does not contain backend', moduleName);
    }
  }
});
log.info('Loaded %i backends', Object.keys(moduleBackends).length);

const backends = moduleBackends;
export { backends as default };
