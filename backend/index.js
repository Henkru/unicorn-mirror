import express from 'express'
import http from 'http'

import * as App from './app'
const config = require('../config')

const app = express();
const PORT = config.backend && config.backend.port ? config.backend.port : 5000
const HOSTNAME = config.backend && config.backend.hostname ? config.backend.hostname : 'localhost'

// Include server routes as a middleware
app.use((req, res, next) => {
    App.app(req, res, next)
})

if (config.backend.serveFrontend) {
    app.use('/', express.static('dist/client'))
}

const server = http.createServer(app)
App.io.listen(server)
server.listen(PORT, HOSTNAME, (err) => {
    if (err) throw err

    const addr = server.address()
    console.log('Listening at http://%s:%d', addr.address, addr.port)
})
