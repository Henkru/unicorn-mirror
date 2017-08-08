import React from 'react';
import UnicornComponent from '../unicorn-component';
import MS from '../../client/components/magic-style';

const titleStyle = Object.assign({}, MS.default.small, MS.default.alignCenter);
const imageStyle = {
  WebkitFilter: 'invert(100%)',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
  maxWidth: '100%',
  opacity: '0.8',
};

export default class XKCD extends UnicornComponent {
  static defaultProps = {
    updateInterval: 6 * 60 * 60,
  }

  state = {
    data: {
      title: '',
      img: '',
    },
  }

  update() {
    this.sendNotification()
      .then(data => this.setState({ data: data }));
  }

  render() {
    return (
      <div>
        <p style={titleStyle} >{this.state.data.title}</p>
        <img
          alt={this.state.data.alt}
          style={imageStyle}
          src={this.state.data.img}
        />
      </div>
    );
  }
}
