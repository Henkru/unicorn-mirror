import logger from './logger'
import config from './config'
const log = logger("loader")

let moduleBackends = {}

log.info("Loading backend modules")
config.user.modules.forEach(m => {
  const moduleName = m.module

  if (!moduleBackends[moduleName]) {
    const backendClass = require(`../modules/${moduleName}/backend`).default

    if (backendClass) {
      try {
        const backend = new backendClass(m.settings || {}, logger(moduleName))

        moduleBackends = Object.assign({}, moduleBackends, { [moduleName]: backend })
        log.info(`Loaded: ${moduleName}`)
      }
      catch (e) {
        log.error(`Failed to load module: ${moduleName}: ${e}`)
      }
    }
  }
})

export { moduleBackends as moduleBackends }