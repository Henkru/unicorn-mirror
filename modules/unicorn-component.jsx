import React from 'react';

export default class UnicornComponent extends React.Component {
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

    if (this.props.updateInterval) {
      setInterval(() => this.update(), this.props.updateInterval * 1000);
    }
  }

  update() {
  }

  receivedNotification(data) {
  }

  sendNotification(data) {
    if (this.state.waitingNotification) {
      return;
    }

    this.props.io.emit('notification', {
      module: this.props.name,
      sender: this.props.id,
      data: data,
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
