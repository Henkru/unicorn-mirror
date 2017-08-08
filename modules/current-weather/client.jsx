import React from 'react';
import UnicornComponent from '../unicorn-component';
import MS from '../../client/components/magic-style';

require('./css/weather-icons.min.css');

const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

export default class CurrentWeather extends UnicornComponent {
  static defaultProps = {
    updateInterval: 60,
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
    '50n': 'wi-night-alt-cloudy-windy',
  }

  state = {
    status: {},
  }

  update() {
    this.sendNotification()
      .then(data => this.setState({ status: data }));
  }

  getTemperature() {
    try {
      return this.state.status.main.temp - 272.15;
    }
    catch (e) {
      return '';
    }
  }

  getSunrise() {
    try {
      return this.state.status.sys.sunrise;
    }
    catch (e) {
      return '';
    }
  }

  getSunset() {
    try {
      return this.state.status.sys.sunset;
    }
    catch (e) {
      return '';
    }
  }

  getWeatherIcon() {
    try {
      return `wi ${CurrentWeather.iconTable[this.state.status.weather[0].icon]}`;
    }
    catch (e) {
      return '';
    }
  }

  getCity() {
    try {
      return this.state.status.name;
    }
    catch (e) {
      return '';
    }
  }

  getDescription() {
    try {
      return this.state.status.weather[0].description;
    }
    catch (e) {
      return '';
    }
  }

  render() {
    const iconStyle = Object.assign({}, MS.default.xlarge, MS.default.bright, MS.default.light);
    const temperatureStyle = Object.assign({}, MS.default.dimmed, MS.default.normal);

    return (
      <div>
        <div style={Object.assign({}, MS.default.normal, MS.default.medium)}>
          {toTitleCase(this.getDescription())}
        </div>
        <div style={iconStyle}>
          <i
            style={{ paddingRight: '0.3em' }}
            className={this.getWeatherIcon()}
          />
          <span style={temperatureStyle}>{this.getTemperature()} &deg;</span>
        </div>
      </div>
    );
  }
}
