export default class BackendModule {
  constructor(settings, log) {
    this.settings = settings;
    this.log = log;
  }

  receiveNotification(sender, data) {
    throw new Error('receiveNotification not implementet');
  }
}
