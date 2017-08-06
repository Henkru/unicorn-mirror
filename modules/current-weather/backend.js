import { default as fetch } from 'isomorphic-fetch'
import * as logger from 'winston'
import querystring from 'querystring'

export default class {
  apiBase = "http://samples.openweathermap.org/data/2.5/weather"

  constructor(settings) {
    this.settings = settings

    if (settings.apiKey === undefined) {
      logger.error("[current-weather] API Key is missing")
    }
    
    this.fetchData()
  }

  fetchData() {
    const url = this.apiBase + "?" + querystring.stringify({
      id: this.settings.locationID,
      appid: this.settings.apiKey,
      //units: this.settings.units || 'metric'
    })

    console.log(url)

    return fetch(url)
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => logger.error(err))
  }

  receiveNotification(sender, data, callback) {
    console.log(sender, data)
    this.fetchData()
    .then(data => callback(data))
  }
}