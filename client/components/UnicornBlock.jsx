import React from 'react';

class UnicornBlock extends React.Component {
  static defaultProps = {
    component: undefined,
    header: '',
    position: undefined
  }

  render() {
    const header = this.props.header !== '' ? <header>{this.props.header}</header> : undefined;

    return <div>
      {header}
      {this.props.component}
    </div>;
  }
}

export { UnicornBlock as default }
