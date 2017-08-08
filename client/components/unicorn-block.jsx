import React from 'react';
import MS from './magic-style';

export default class UnicornBlock extends React.Component {
  static propTypes = {
    component: React.PropTypes.element.isRequired,
    header: React.PropTypes.string,
  }

  static defaultProps = {
    header: '',
  }

  render() {
    const style = Object.assign({}, MS.Header, MS.default.bright);
    const header = this.props.header !== '' ? <header style={style}>{this.props.header}</header> : null;

    return (
      <div>
        {header}
        {this.props.component}
      </div>);
  }
}
