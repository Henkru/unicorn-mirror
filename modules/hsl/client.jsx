import moment from 'moment';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

import React from 'react';
import UnicornComponent from '../unicorn-component';
import MS from '../../client/components/magic-style';
import JsonTable from '../../client/components/react-json-table';

const arriveStyle = Object.assign({}, MS.default.bright, MS.default.alignRight, { display: 'block' });
const nameStyle = Object.assign({}, MS.default.alignLeft, { display: 'block' });

export default class HSL extends UnicornComponent {
  static defaultProps = {
    settings: {
      id: '',
      numberOfDepartures: 10,
    },
    updateInterval: 5 * 60,
  }

  static client = new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    }),
  })

  state = {
    busses: [],
  }

  update() {
    const numberOfDepartures = this.props.settings.numberOfDepartures || HSL.defaultProps.settings.numberOfDepartures;
    HSL.client.query({
      query: gql`
        {
          stop(id: "${this.props.settings.id}") {
            stoptimesWithoutPatterns(numberOfDepartures:${numberOfDepartures}) {
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

  render() {
    const columns = [
      {
        key: 'name',
        cell: item => <span style={nameStyle}>{ item.trip.route.shortName }</span>,
      },
      {
        key: 'arrive',
        cell: (item) => {
          const timestamp = item.serviceDay + item.scheduledDeparture + item.departureDelay;
          return <span style={arriveStyle}>{moment(timestamp * 1000).format('HH:mm')}</span>;
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
