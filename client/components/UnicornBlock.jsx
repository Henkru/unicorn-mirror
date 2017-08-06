import React from 'react';
import MS from './MagicStyle'

class UnicornBlock extends React.Component {
  static defaultProps = {
    component: undefined,
    header: '',
    position: undefined
  }

  render() {
    const style = Object.assign(MS.Header, MS.default.bright)
    const header = this.props.header !== '' ? <header style={style}>{this.props.header}</header> : undefined;

    return <div>
      {header}
      {this.props.component}
    </div>;
  }
}

export { UnicornBlock as default }
