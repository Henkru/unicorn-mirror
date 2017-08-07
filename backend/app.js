import express from 'express';
import io from 'socket.io';

import backends from './ModuleLoader';
import handler from './BackendHandler';

const app = express.Router();
const socket = io();

handler(socket, backends);

export { app, socket as io };
