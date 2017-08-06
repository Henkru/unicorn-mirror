import express from 'express'
import io from 'socket.io'

import { moduleBackends as backends } from './ModuleLoader'
import { default as handler } from './BackendHandler'

let app = express.Router()
let socket = io()

app.get('/whoami', (req, res) => {
  res.send("You are a winner")
});

handler(socket, backends)

export { app as app, socket as io }
