import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

export default class {
  apiBase = 'http://samples.openweathermap.org/data/2.5/weather'

  constructor(settings, log) {
    this.settings = settings;

    if (!settings.apiKey) throw 'API key is missing';

    this.fetchData()
  }

  fetchData() {
    const params = querystring.stringify({
      id: this.settings.locationID,
      appid: this.settings.apiKey,
    });
    const url = `${this.apiBase}?${params}`;

    return fetch(url)
      .then(res => res.json())
      .then(res => res)
  }

  receiveNotification(sender, data, callback) {
    this.fetchData()
      .then(data => callback(data))
  }
}
