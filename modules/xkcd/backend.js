import fetch from 'isomorphic-fetch';
import BackendModule from '../backend-module';

export default class XKCD extends BackendModule {
  apiBase = 'https://xkcd.com/info.0.json'

  receiveNotification(sender, data, callback) {
    fetch(this.apiBase)
      .then(res => res.json())
      .then(json => callback(json));
  }
}
