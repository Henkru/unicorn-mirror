import React from 'react';
import JsonTable from '../../client/components/react-json-table';
import UnicornComponent from '../unicorn-component';
import MS from '../../client/components/magic-style';

export default class FsW3Top10 extends UnicornComponent {
  static defaultProps = {
  }

  state = {
    detections: [],
  }

  componentDidMount() {
    this.update();
  }

  update() {
    this.sendNotification({ action: 'update' });
  }

  receiveNotification(data) {
    this.setState({ detections: data.detections });
    setTimeout(() => {
      this.update();
    }, data.polling_interval * 1000);
  }

  render() {
    const columns = [
      {
        key: 'name',
        cell: (item) => {
          const style = Object.assign({}, MS.default.alignLeft, { display: 'block' });
          return <span style={style}>{item.name}</span>;
        },
      },
      {
        key: 'count',
        cell: (item) => {
          const style = Object.assign({}, MS.default.bright, MS.default.alignRight, { display: 'block' });
          return <span style={style}>{item.count}</span>;
        },
      },
    ]

    const table = (
      <JsonTable
        style={{ width: '100%' }}
        rows={this.state.detections}
        columns={columns}
        settings={{ header: false }}
      />
    );

    return (
      <div>
        {table}
      </div>
    );
  }
}
