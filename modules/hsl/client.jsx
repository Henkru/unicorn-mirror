import moment from 'moment';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

import React from 'react';
import UnicornComponent from '../UnicornComponent';
import MS from '../../client/components/MagicStyle';
import JsonTable from '../../client/components/react-json-table';

export default class HSL extends UnicornComponent {
  static defaultProps = {
    settings: {
      id: '',
      numberOfDepartures: 10,
    }
  }

  static client = new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    }),
  })

  state = {
    busses: [],
  }

  updateBusses() {
    HSL.client.query({
      query: gql`
        {
          stop(id: "${this.props.settings.id}") {
            stoptimesWithoutPatterns(numberOfDepartures:${this.props.settings.numberOfDepartures || HSL.defaultProps.settings.numberOfDepartures}) {
              trip{
                route{
                  shortName
                }
              }
              scheduledDeparture departureDelay serviceDay
            }
          }
        }
          `,
    })
      .then(res => this.setState({ busses: res.data.stop.stoptimesWithoutPatterns }));
  }

  componentDidMount() {
    this.updateBusses();
    setInterval(() => this.updateBusses(), 30 * 1000);
  }

  render() {
    const columns = [
      {
        key: 'name',
        cell: (item, columnKey) => {
          const style = Object.assign({}, MS.default.alignLeft, { display: 'block' });
          return <span style={style}>{ item.trip.route.shortName }</span>;
        },
      },
      {
        key: 'count',
        cell: (item, columnKey) => {
          const style = Object.assign({}, MS.default.bright, MS.default.alignRight, { display: 'block' });
          const timestamp = item.serviceDay + item.scheduledDeparture + item.departureDelay;

          return <span style={style}>{moment(timestamp * 1000).format('HH:mm')}</span>;
        },
      },
    ];

    const table = (
      <JsonTable
        style={{ width: '100%' }}
        rows={this.state.busses}
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
