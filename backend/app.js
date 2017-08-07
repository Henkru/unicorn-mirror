import express from 'express'
import io from 'socket.io'

import { moduleBackends as backends } from './ModuleLoader'
import { default as handler } from './BackendHandler'

const app = express.Router()
const socket = io()

handler(socket, backends)

export { app as app, socket as io }