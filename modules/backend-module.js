export default class BackendModule {
  constructor(settings, log) {
    this.settings = settings;
    this.log = log;
  }

  receiveNotification(sender, data) {
    this.log.silly('Received notification from %s with:', sender, data);
    throw new Error('receiveNotification not implementet');
  }
}
