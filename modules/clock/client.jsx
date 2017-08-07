import React from 'react';
import moment from 'moment';
import UnicornComponent from '../UnicornComponent';
import MS from '../../client/components/MagicStyle';

export default class Clock extends UnicornComponent {
  static defaultProps = {
    format: {
      date: 'dddd, LL',
      time: {
        hours: 'HH:',
        minutes: 'mm',
        seconds: 'ss',
      }
    }
  }

  state = {
    id: '',
    time: moment(),
  }

  componentDidMount() {
    setInterval(() => this.setState({ time: moment() }), 1000);
  }

  date() {
    const date = moment(this.state.time).format(this.props.format.date);

    return (
      <div style={Object.assign({}, MS.default.normal, MS.default.medium)}>
        {date}
      </div>
    );
  }

  time() {
    const hours = moment(this.state.time).format(this.props.format.time.hours);
    const minutes = moment(this.state.time).format(this.props.format.time.minutes);
    const seconds = moment(this.state.time).format(this.props.format.time.seconds);

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
