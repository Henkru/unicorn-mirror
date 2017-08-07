import userConfig from '../config';

const socketUrl = userConfig.frontend.api ? userConfig.frontend.api : window.location.origin;

export default {
  socketUrl: socketUrl,
  user: userConfig,
};
