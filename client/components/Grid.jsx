import React from 'react';
import { Row, Col } from 'react-grid-system';
import MS from './MagicStyle'

class Grid extends React.Component {
    static defaultProps = {
        modules: []
    }

    render() {
        const leftModules = this.props.modules.filter(e => e.props.position == "left")
        const centerModules = this.props.modules.filter(e => e.props.position == "center")
        const rightModules = this.props.modules.filter(e => e.props.position == "right")
        const bottomModules = this.props.modules.filter(e => e.props.position == "bottom")

        return <div>
            <Row>
                <Col sm={3}>
                    {leftModules}
                </Col>
                <Col sm={6}>
                    {centerModules}
                </Col>
                <Col sm={3} style={MS.default.alignRight}>
                    {rightModules}
                </Col>
            </Row>
            <Row>
                <Col sm={12} style={ Object.assign({ position: "fixed", bottom: 0}, MS.default.alignCenter) }>
                    {bottomModules}
                </Col>
            </Row>
        </div>
    }
}

export { Grid as default }
