import userConfig from '../config';

const port = userConfig.backend && userConfig.backend.port ? userConfig.backend.port : 5000;
const hostname = userConfig.backend && userConfig.backend.hostname ? userConfig.backend.hostname : 'localhost';

export default {
  user: userConfig,
  port,
  hostname,
};
