import fetch from 'isomorphic-fetch';

export default class {
  apiBase = 'http://worldmap3.f-secure.com/api/top10/'

  receiveNotification() {
    return fetch(this.apiBase)
      .then(res => res.json());
  }
}
