// Libaries
import * as io from 'socket.io-client';
import uuid from 'uuid';

// Elements
import React from 'react';
import BodyStyle from 'body-style';
import UnicornBlock from './UnicornBlock';
import Grid from './Grid';

// Styles
import MS from './MagicStyle';
import roboto from '../fonts/roboto.css';

import config from '../config';

const socket = require('socket.io-client')(config.socketUrl);

export default class App extends React.Component {
  static createModuleComponent(module) {
    const moduleName = module.module;
    const Module = require(`../../modules/${moduleName}/client`).default;

    const key = uuid.v4();
    return <Module name={moduleName} key={key} id={key} io={socket} settings={module.settings || {}} />;
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