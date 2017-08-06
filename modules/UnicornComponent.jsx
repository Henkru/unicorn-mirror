import React from 'react';

class UnicornComponent extends React.Component {
  static defaultProps = {
    id: '',
    name: '',
    io: null
  }

  render() {
    return <div>{this.props.key}</div>;
  }

  receivedNotification(data) {
  }

  sendNotification(data) {
    this.props.io.emit('notification', {
      module: this.props.name,
      sender: this.props.id,
      data: data
    });

    this.props.io.on(`notification_${ this.props.id }`, msg => {
      const { module, sender, data } = msg;

      this.receiveNotification(data);
      this.props.io.removeListener(`notification_${ this.props.id }`)
    });
  }
}

export { UnicornComponent as default }
