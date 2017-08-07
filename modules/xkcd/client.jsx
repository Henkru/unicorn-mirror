import React from 'react'
import JsonTable from '../../client/components/react-json-table'
import UnicornComponent from '../UnicornComponent'
import MS from '../../client/components/MagicStyle'

class XKCD extends UnicornComponent {
  static defaultProps = {
  }

  state = {
    data: {
      title: '',
      img: ''
    }
  }

  componentDidMount() {
    this.update();
  }

  update() {
    this.sendNotification({ action: 'update' })
  }

  receiveNotification(data) {
    this.setState({ data: data })
    setTimeout(() => {
      this.update()
    }, 12 * 60 * 1000)
  }


  render() {
    return <div>
      <p style={Object.assign({}, MS.default.small, MS.default.alignCenter)} >{ this.state.data.title }</p>
      <img style={{ 
          webkitFilter: "invert(100%)", 
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          maxWidth: "100%",
          opacity: "0.8"
        }}
        src={ this.state.data.img } />
    </div>
  }
}

export { XKCD as default }
