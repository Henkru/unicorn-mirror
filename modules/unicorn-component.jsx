import React from 'react';

export default class UnicornComponent extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    io: React.PropTypes.object,
    updateInterval: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    id: '',
    name: '',
    io: null,
    updateInterval: null,
  }

  state = {
    waitingNotification: false,
  }

  componentDidMount() {
    this.update();

    if (this.props.updateInterval > 0) {
      setInterval(() => this.update(), this.props.updateInterval * 1000);
    }
  }

  update() {
  }

  sendNotification(notification) {
    return new Promise((resolve, reject) => {
      // Reject the notification if we are still waiting a previous
      if (this.state.waitingNotification) {
        reject('Previous request is still waiting');
        return;
      }

      // Send the notification
      this.props.io.emit('notification', {
        module: this.props.name,
        sender: this.props.id,
        data: notification || {},
      });
      this.setState(Object.assign({}, this.state, { waitingNotification: true }));

      // Handle the response
      const messageId = `notification_${this.props.id}`;
      this.props.io.once(messageId, (msg) => {
        const { module, sender, data } = msg;

        this.setState(Object.assign({}, this.state, { waitingNotification: false }));
        resolve(data);
      });
    });
  }

  render() {
    return <div>{this.props.id}</div>;
  }
}
