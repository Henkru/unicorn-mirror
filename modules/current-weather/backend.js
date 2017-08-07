import { default as fetch } from 'isomorphic-fetch'
import querystring from 'querystring'

export default class {
  apiBase = "http://samples.openweathermap.org/data/2.5/weather"

  constructor(settings, log) {
    this.settings = settings

    if (!settings.apiKey)
      throw "API key is missing"
    
    this.fetchData()
  }

  fetchData() {
    const url = this.apiBase + "?" + querystring.stringify({
      id: this.settings.locationID,
      appid: this.settings.apiKey
    })

    return fetch(url)
    .then(res => res.json())
    .then(res => {
      return res
    })
  }

  receiveNotification(sender, data, callback) {
    this.fetchData()
    .then(data => callback(data))
  }
}