import React from 'react'
import JsonTable from './react-json-table'
import UnicornComponent from '../UnicornComponent'
import MS from '../../client/components/MagicStyle'

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
    const columns = [
      'name',
      {
        key: 'count', cell: (item, columnKey) => {
          const style = Object.assign({}, MS.default.bright, MS.default.alignRight, {display: 'block'})
          return <span style={style}>{item.count}</span>
        }
      },
    ]

    let table = <JsonTable
        style={{width: '100%'}}
        rows={this.state.detections}
        columns={columns}
        settings={{ header: false }} />

    return <div>
      {table}
    </div>
  }
}

export { FsW3Top10 as default }
