import fetch from 'isomorphic-fetch';
import BackendModule from '../backend-module';

export default class XKCD extends BackendModule {
  apiBase = 'https://xkcd.com/info.0.json'

  receiveNotification() {
    return fetch(this.apiBase)
      .then(res => res.json());
  }
}
