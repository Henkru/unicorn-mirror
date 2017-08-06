import React from 'react'
import JsonTable from 'react-json-table'
import UnicornComponent from '../UnicornComponent'

class FsW3Top10 extends UnicornComponent {
  static defaultProps = {
  }

  state = {
    detections: []
  }

  componentDidMount() {
    this.update();
  }

  update() {
    this.sendNotification({ action: 'update' })
  }

  receiveNotification(data) {
    this.setState({ detections: data.detections })
    setTimeout(() => {
      this.update()
    }, data.polling_interval * 1000)
  }


  render() {
    return <div>
      <JsonTable
        rows={this.state.detections}
        columns={['name', 'count']}
        settings={{ header: false }} />
    </div>
  }
}

export { FsW3Top10 as default }
