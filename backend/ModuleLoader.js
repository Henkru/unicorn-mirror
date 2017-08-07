import logger from './logger'
import config from './config'
const log = logger("loader")

let moduleBackends = {}

log.info("Loading backend modules")
config.user.modules.forEach(m => {
  const moduleName = m.module

  if (!moduleBackends[moduleName]) {
    try {
      const backendClass = require(`../modules/${moduleName}/backend`).default

      if (!backendClass.constructor)
        throw "Module is not class"

      try {
        const backend = new backendClass(m.settings || {}, logger(moduleName))

        moduleBackends = Object.assign({}, moduleBackends, { [moduleName]: backend })
        log.info("Module %s loaded", moduleName)
      }
      catch (e) {
        log.error(`Failed to load module %s: %s`, moduleName, e)
      }
    }
    catch (e) {
      log.info("Module %s doesn't contain backend", moduleName)
    }
  }
})
log.info("Loaded %i backends", Object.keys(moduleBackends).length)

export { moduleBackends as moduleBackends }