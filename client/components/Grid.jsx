import React from 'react';
import { Container, Row, Col } from 'react-grid-system';

class Grid extends React.Component {
    static defaultProps = {
        modules: []
    }

    render() {
        const leftModules = this.props.modules.filter(e => e.props.position == "left")
        const centerModules = this.props.modules.filter(e => e.props.position == "center")
        const rightModules = this.props.modules.filter(e => e.props.position == "right")
        const bottomModules = this.props.modules.filter(e => e.props.position == "bottom")

        return <Container>
            <Row>
                <Col sm={4}>
                    {leftModules}
                </Col>
                <Col sm={4}>
                    {centerModules}
                </Col>
                <Col sm={4}>
                    {rightModules}
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    {bottomModules}
                </Col>
            </Row>
        </Container>
    }
}

export { Grid as default }
