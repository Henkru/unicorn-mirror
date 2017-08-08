import React from 'react';
import moment from 'moment';
import UnicornComponent from '../unicorn-component';
import MS from '../../client/components/magic-style';

const divTimeStyle = Object.assign({}, MS.default.xlarge, MS.default.bright, MS.default.light);
const secondsStyle = Object.assign({}, MS.default.dimmed, { fontSize: '50%', lineHeight: '50%' });
const divDateStyle = Object.assign({}, MS.default.normal, MS.default.medium);

export default class Clock extends UnicornComponent {
  static defaultProps = {
    settings: {
      format: {
        date: 'dddd, LL',
        time: {
          hours: 'HH:',
          minutes: 'mm',
          seconds: 'ss',
        },
      },
    },
    updateInterval: 1,
  }

  state = {
    time: moment(),
  }

  update() {
    this.setState({ time: moment() });
  }

  date() {
    return (
      <div style={divDateStyle}>
        {moment(this.state.time).format(this.props.settings.format.date)}
      </div>
    );
  }

  time() {
    const timeFormat = this.props.settings.format.time;
    const hours = moment(this.state.time).format(timeFormat.hours);
    const minutes = moment(this.state.time).format(timeFormat.minutes);
    const seconds = moment(this.state.time).format(timeFormat.seconds);

    return (
      <div style={divTimeStyle}>
        {hours}{minutes}
        <sup style={secondsStyle}>{seconds}</sup>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.date()}
        {this.time()}
      </div>
    );
  }
}
