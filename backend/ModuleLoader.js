import * as logger from 'winston'

const config = require('../config')

let moduleBackends = {}

logger.info("Loading backend of modules")
config.modules.forEach(m => {
  const moduleName = m.module

  if (!moduleBackends[moduleName]) {
    const backend = require(`../modules/${moduleName}/backend`).default

    if (backend) {
      logger.info(`Loaded: ${moduleName}`)
      moduleBackends = Object.assign({}, moduleBackends, { [moduleName]: new backend(m.settings || {}) })
    }
  }
})

export { moduleBackends as moduleBackends }