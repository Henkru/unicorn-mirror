import React from 'react'
import BodyStyle from 'body-style'
import UnicornBlock from './UnicornBlock'
import Grid from './Grid'

import MS from './MagicStyle'
require('../fonts/roboto.css')

import * as io from 'socket.io-client'
import uuid from 'uuid'

const config = require('../../config')

const socketUrl = "http://" + window.location.hostname + ":5000";
const socket = require('socket.io-client')(socketUrl)

export default class App extends React.Component {
  state = {
    modules: config.modules.map(module =>
      <UnicornBlock
        key={ uuid.v4() }
        component={ this.createModuleComponent(module) }
        header={ module.header }
        position={ module.position }
      />
    )
  }

  createModuleComponent(module) {
    const moduleName = module.module;
    const Module = require(`../../modules/${ moduleName }/client`).default;

    const key = uuid.v4();
    return <Module name={ moduleName } key={ key } id={ key } io={ socket } settings={ module.settings || {} } />
  }

  render() {
    return <div>
      <BodyStyle style={ MS.App } />
      <Grid modules={ this.state.modules }></Grid>
    </div>
  }
}