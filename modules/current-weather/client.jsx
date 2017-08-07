import React from 'react'
import JsonTable from '../../client/components/react-json-table'
import UnicornComponent from '../UnicornComponent'
import MS from '../../client/components/MagicStyle'

require('./css/weather-icons.min.css')

const toTitleCase = str => {
    return str.replace(/\w\S*/g, txt => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

class CurrentWeather extends UnicornComponent {
  static defaultProps = {
  }

  static iconTable = {
    '01d': 'wi-day-sunny',
    '02d': 'wi-day-cloudy',
    '03d': 'wi-cloudy',
    '04d': 'wi-cloudy-windy',
    '09d': 'wi-showers',
    '10d': 'wi-rain',
    '11d': 'wi-thunderstorm',
    '13d': 'wi-snow',
    '50d': 'wi-fog',
    '01n': 'wi-night-clear',
    '02n': 'wi-night-cloudy',
    '03n': 'wi-night-cloudy',
    '04n': 'wi-night-cloudy',
    '09n': 'wi-night-showers',
    '10n': 'wi-night-rain',
    '11n': 'wi-night-thunderstorm',
    '13n': 'wi-night-snow',
    '50n': 'wi-night-alt-cloudy-windy'
  }

  state = {
    status: {}
  }

  componentDidMount() {
    this.update()
    setInterval(() => this.update(), 60 * 1000)
  }

  update() {
    this.sendNotification({ action: 'update' })
  }

  receiveNotification(data) {
    this.setState({ status: data })
  }

  getTemperature() {
    try {
      return this.state.status.main.temp - 272.15
    }
    catch(e) {
      return ''
    }
  }

  getSunrise() {
    try {
      return this.state.status.sys.sunrise
    }
    catch(e) {
      return ''
    }
  }

  getSunset() {
    try {
      return this.state.status.sys.sunset
    }
    catch(e) {
      return ''
    }
  }

  getWeatherIcon() {
    try {
      return "wi " + CurrentWeather.iconTable[this.state.status.weather[0].icon]
    }
    catch(e) {
      return ''
    }
  }

  getCity() {
    try {
      return this.state.status.name
    }
    catch(e) {
      return ''
    }
  }

  getDescription() {
    try {
      return this.state.status.weather[0].description
    }
    catch(e) {
      return ''
    }
  }

  render() {
    const iconStyle = Object.assign({}, MS.default.xlarge, MS.default.bright, MS.default.light)
    const temperatureStyle = Object.assign({}, MS.default.dimmed, MS.default.normal)

    return <div>
        <div style={Object.assign({}, MS.default.normal, MS.default.medium)}>
          { toTitleCase(this.getDescription()) }
        </div>
        <div style={ iconStyle }>
          <i style={{ paddingRight: "0.3em" }} className={ this.getWeatherIcon() }></i>
          <span style={ temperatureStyle }>{ this.getTemperature() } &deg;</span>
        </div>
    </div>
  }
}

export { CurrentWeather as default }
