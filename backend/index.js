import express from 'express'
import http from 'http'

import * as App from './app'

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 5000

// Include server routes as a middleware
app.use((req, res, next) => {
    App.app(req, res, next)
})

app.use('/fonts/', express.static('fonts'))

const server = http.createServer(app)
App.io.listen(server)
server.listen(PORT, 'localhost', (err) => {
    if (err) throw err

    const addr = server.address()
    console.log('Listening at http://%s:%d', addr.address, addr.port)
})
