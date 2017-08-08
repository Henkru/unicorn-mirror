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

  receivedNotification(data) {
  }

  sendNotification(notification) {
    if (this.state.waitingNotification) {
      return;
    }

    this.props.io.emit('notification', {
      module: this.props.name,
      sender: this.props.id,
      data: notification,
    });
    this.setState(Object.assign({}, this.state, { waitingNotification: true }));

    this.props.io.on(`notification_${this.props.id}`, (msg) => {
      const { module, sender, data } = msg;
      this.receiveNotification(data);
      this.props.io.removeListener(`notification_${this.props.id}`);
      this.setState(Object.assign({}, this.state, { waitingNotification: false }));
    });
  }

  render() {
    return <div>{this.props.id}</div>;
  }
}
