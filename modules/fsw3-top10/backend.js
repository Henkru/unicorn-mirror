import { default as fetch } from 'isomorphic-fetch'

export default class {
  apiBase = "http://worldmap3.f-secure.com/api/top10/"

  receiveNotification(sender, data, callback) {
    fetch(this.apiBase).then(
      res => res.json()
    )
      .then(json => {
        callback(json)
      });
  }
}