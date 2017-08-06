import React from 'react'
import moment from 'moment'
import UnicornComponent from '../UnicornComponent'

class Clock extends UnicornComponent {
  static defaultProps = {
    format: {
      date: "dddd, LL",
      time: {
        hours: "HH:",
        minutes: "mm",
        seconds: "ss"
      }
    }
  }

  state = {
    id: '',
    time: moment()
  }

  componentDidMount() {
    setInterval(() => this.setState({ time: moment() }), 1000)
  }

  receiveNotification(data) {
  }

  date() {
    const date = moment(this.state.time).format(this.props.format.date)

    return <div>
      {date}
    </div>
  }

  time() {
    const hours = moment(this.state.time).format(this.props.format.time.hours)
    const minutes = moment(this.state.time).format(this.props.format.time.minutes)
    const seconds = moment(this.state.time).format(this.props.format.time.seconds)

    return <div>
      {hours}{minutes}
      <sup>{seconds}</sup>
    </div>;
  }

  render() {
    const time = this.time()
    const date = this.date()

    return <div>
      {date}
      {time}
    </div>
  }
}

export { Clock as default }
