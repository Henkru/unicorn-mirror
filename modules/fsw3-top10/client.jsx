import React from 'react';
import JsonTable from '../../client/components/react-json-table';
import UnicornComponent from '../unicorn-component';
import MS from '../../client/components/magic-style';

const nameStyle = Object.assign({}, MS.default.alignLeft, { display: 'block' });
const countStyle = Object.assign({}, nameStyle, MS.default.bright, MS.default.alignRight);

export default class FsW3Top10 extends UnicornComponent {
  static defaultProps = {
    updateInterval: 0, // Fecthed data will tell the update time
  }

  state = {
    detections: [],
  }

  componentDidMount() {
    this.update();
  }

  update() {
    this.sendNotification()
      .then((data) => {
        this.setState({ detections: data.detections });

        setTimeout(() => {
          this.update();
        }, data.polling_interval * 1000);
      });
  }

  render() {
    const columns = [
      {
        key: 'name',
        cell: item => <span style={nameStyle}>{item.name}</span>,
      },
      {
        key: 'count',
        cell: item => <span style={countStyle}>{item.count}</span>,
      },
    ];

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
