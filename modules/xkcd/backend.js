import { default as fetch } from 'isomorphic-fetch'

export default class {
  apiBase = "https://xkcd.com/info.0.json"

  receiveNotification(sender, data, callback) {
    fetch(this.apiBase)
    .then( res => res.json() )
    .then( json => {
      callback(json)
    })
  }
}