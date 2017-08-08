import express from 'express';
import http from 'http';

import * as App from './app';
import config from './config';

import logger from './logger';

const log = logger('backend');
const app = express();

// Include server routes as a middleware
app.use((req, res, next) => {
  App.app(req, res, next);
});

if (config.user.backend.serveFrontend) {
  app.use('/', express.static(config.user.backend.frontendPath));
}

const server = http.createServer(app);
App.io.listen(server);
server.listen(config.port, config.hostname, (err) => {
  if (err) {
    throw err;
  }

  const addr = server.address();
  log.info('Listening at http://%s:%d', addr.address, addr.port);
});
