import userConfig from '../config';

const port = userConfig.backend && userConfig.backend.port ? userConfig.backend.port : 5000;
const hostname = userConfig.backend && userConfig.backend.hostname ? userConfig.backend.hostname : 'localhost';
const prod =  (process.env.NODE_ENV === 'production');

export default {
  user: userConfig,
  port,
  hostname,
  prod,
  crashTreshold: 5,
};
