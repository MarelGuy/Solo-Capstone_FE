import React, { PureComponent } from 'react'
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';
import { Redirect } from "react-router-dom"
class NewScp extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            scp: {},
            content: "",
            mdContent: "",
            redirect: false
        }
    }

    componentDidMount() {
        const accessToken = localStorage.getItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken")
        const config = {
            headers: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        }
        axios.get(process.env.REACT_APP_API_URL + "/user/me", config)
            .then((res) => {
                this.setState({ user: res.data })
            })
        axios.get(process.env.REACT_APP_API_URL + "/scp/" + this.props.match.params.id, config)
            .then((res) => {
                this.setState({ scp: res.data })
                this.setState({ mdContent: res.data.mdContent })
            })
    }

    onFormChangeHandler = ({ html, text }) => {
        this.setState({ content: html })
        this.setState({ mdContent: text })
    }


    onSubmitHandler = async (e) => {
        e.preventDefault();
        const rawBody = {
            user: this.state.user._id,
            content: this.state.content,
            mdContent: this.state.mdContent
        }
        const body = JSON.stringify(rawBody)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.put(process.env.REACT_APP_API_URL + "/scp/" + this.props.match.params.id, body, config)
            .then((res) => {
                this.setState({ redirect: true })
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const mdParser = new MarkdownIt()
        const { redirect, scp } = this.state
        return (
            <div id="NewScpPage">
                <div>{redirect === false ? "" : <Redirect to={"/scp/" + scp._id} />}</div>
                <Form>
                    <Row>
                        <Col>
                            <h2 className="NewScpsH2">Create a new scp</h2>
                            <p>Do you want to create an SCP? Well, you can, but you need to follow some rules.
                            Your new SCP must have a new item number, an example would be:
                            If your new SCP it's SCP-012, but we have SCP-012 and SCP-013, then you need to create SCP-014.
                            The description must meet the object class, you shouldn't write that an SCP kills everyone but it's a safe/thaumiel class.
                            Containment procedures are not strictly needed, but still, we suggest to put them in. </p>
                            <p>We use markdown! Don't know how to use it? click <a href="https://www.markdownguide.org/getting-started/">here</a> to learn how to!</p>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <h2 className="NewScpsH2">Rules:</h2>
                                    <p> An SCP MUST have</p>
                                    <span className="ScpRuleList" >
                                        <li>- An item number</li>
                                        <li>- An object class</li>
                                        <li>- A description</li>
                                    </span>
                                </Col>
                                <Col>
                                    <br />
                                    <br />
                                    <p> An SCP CAN have</p>
                                    <span className="ScpRuleList" >
                                        <li>- Containment procedures</li>
                                        <li>- Addendums and Documents</li>
                                    </span>
                                </Col>
                                <Col>
                                    <br />
                                    <br />
                                    <p> An SCP CAN'T have</p>
                                    <span className="ScpRuleList" >
                                        <li>- The same item number as another scp</li>
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Form.Group>
                        <MdEditor
                            style={{ height: "500px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={(e) => this.onFormChangeHandler(e)}
                            value={this.state.mdContent}
                        />
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Container>
                            <Button className="ScpEditPageSubmitButton" onClick={(e) => { this.onSubmitHandler(e) }}>Submit</Button>
                        </Container>
                    </Form.Group >
                </Form>
            </div>
        )
    }
}

export default NewScp