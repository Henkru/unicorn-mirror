import React from 'react'
import BodyStyle from 'body-style'
import UnicornBlock from './UnicornBlock'
import Grid from './Grid'

import MS from './MagicStyle'

import * as io from 'socket.io-client'
import uuid from 'uuid'

const config = require('../../config')
const socket = require('socket.io-client')('http://localhost:5000')

export default class App extends React.Component {
  state = {
    modules: config.modules.map(module =>
      <UnicornBlock
        key={uuid.v4()}
        component={this.createModuleComponent(module)}
        header={module.header}
        position={module.position}
      />
    )
  }

  createModuleComponent(module) {
    const moduleName = module.module;
    const Module = require(`../../modules/${moduleName}/${moduleName}`).default;

    const key = uuid.v4();
    return <Module name={moduleName} key={key} id={key} io={socket} />
  }

  render() {
    return <div>
      <BodyStyle style={MS.App} />
      <Grid modules={this.state.modules}></Grid>
    </div>
  }
}