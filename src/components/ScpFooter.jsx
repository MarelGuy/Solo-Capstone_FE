import React, { PureComponent } from 'react'
import { Col, Row } from 'react-bootstrap'

class ScpFooter extends PureComponent {
    render() {
        return (
            <footer>
                <Row>
                    <Col>
                        <p>Powered by <a href="https://www.twitch.tv/marelguy">twitch.tv/marelguy</a></p>
                        <p id="ScpGithubFooter" ><a href="github.com/MarelGuy">GitHub</a></p>
                    </Col>
                </Row>
            </footer>
        )
    }
}

export default ScpFooter