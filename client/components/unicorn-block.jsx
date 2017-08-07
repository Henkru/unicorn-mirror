import React from 'react';
import MS from './magic-style';

export default class UnicornBlock extends React.Component {
  static defaultProps = {
    component: null,
    header: '',
    position: null,
  }

  render() {
    const style = Object.assign({}, MS.Header, MS.default.bright);
    const header = this.props.header !== '' ? <header style={style}>{this.props.header}</header> : undefined;

    return (
      <div>
        {header}
        {this.props.component}
      </div>);
  }
}
