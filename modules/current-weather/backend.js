import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
import BackendModule from '../backend-module';

export default class CurrentWeather extends BackendModule {
  apiBase = 'http://samples.openweathermap.org/data/2.5/weather'

  fetchData() {
    if (!this.settings.apiKey) {
      throw new Error('API key is missing');
    }

    const params = querystring.stringify({
      id: this.settings.locationID,
      appid: this.settings.apiKey,
    });
    const url = `${this.apiBase}?${params}`;

    return fetch(url)
      .then(res => res.json())
      .then(res => res);
  }

  receiveNotification(sender, data, callback) {
    this.fetchData()
      .then(res => callback(res));
  }
}
