import React from 'react';
import moment from 'moment';
import UnicornComponent from '../unicorn-component';
import MS from '../../client/components/magic-style';

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
    id: '',
    time: moment(),
  }

  update() {
    this.setState({ time: moment() });
  }

  date() {
    const date = moment(this.state.time).format(this.props.settings.format.date);

    return (
      <div style={Object.assign({}, MS.default.normal, MS.default.medium)}>
        {date}
      </div>
    );
  }

  time() {
    const timeFormat = this.props.settings.format.time;
    const hours = moment(this.state.time).format(timeFormat.hours);
    const minutes = moment(this.state.time).format(timeFormat.minutes);
    const seconds = moment(this.state.time).format(timeFormat.seconds);

    const divStyle = Object.assign({}, MS.default.xlarge, MS.default.bright, MS.default.light);
    const secondsStyle = Object.assign({}, MS.default.dimmed, { fontSize: '50%', lineHeight: '50%' });

    return (
      <div style={divStyle}>
        {hours}{minutes}
        <sup style={secondsStyle}>{seconds}</sup>
      </div>
    );
  }

  render() {
    const time = this.time();
    const date = this.date();

    return (
      <div>
        {date}
        {time}
      </div>
    );
  }
}
