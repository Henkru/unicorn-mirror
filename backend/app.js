import express from 'express';
import io from 'socket.io';

import backends from './module-loader';
import handler from './backend-handler';

const app = new express.Router();
const socket = io();

handler(socket, backends);

export { app, socket as io };
