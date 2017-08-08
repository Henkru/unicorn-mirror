export default class BackendModule {
  constructor(settings, log) {
    this.settings = settings;
    this.log = log;
  }

  receiveNotification(sender, data, callback) {
    throw new Error('receiveNotification not implementet');
  }
}
