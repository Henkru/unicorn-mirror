// Libaries
import SocketIO from 'socket.io-client';
import uuid from 'uuid';

import React from 'react';
import BodyStyle from 'body-style';
import UnicornBlock from './unicorn-block';
import Grid from './grid';
import MS from './magic-style';
import config from '../config';

// This will fire the Webpack includes the fonts
require('../fonts/roboto.css');

const io = new SocketIO(config.socketUrl);

export default class App extends React.Component {
  static createModuleComponent(module) {
    const moduleName = module.module;
    const Module = require(`../../modules/${moduleName}/client`).default;

    const key = uuid.v4();
    return (
      <Module
        name={moduleName}
        key={key}
        id={key}
        io={io}
        updateInterval={module.updateInterval}
        settings={module.settings}
      />
    );
  }

  state = {
    modules: config.user.modules.map(module => (
      <UnicornBlock
        key={uuid.v4()}
        component={App.createModuleComponent(module)}
        header={module.header}
        position={module.position}
      />
    )
    ),
  }

  render() {
    return (
      <div>
        <BodyStyle style={MS.App} />
        <Grid modules={this.state.modules} />
      </div>
    );
  }
}
