import React, { PureComponent } from 'react'
import axios from 'axios'
import { Col, Form, Row, Button, Card } from 'react-bootstrap'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { Redirect } from "react-router-dom"
class NewForum extends PureComponent {
    constructor(props) {
        super(props)
        this.categoryRef = React.createRef();
        this.state = {
            user: {},
            threadContent: "",
            isLiked: false,
            isFav: false,
            redirect: false,
            category: "",
            title: "",
            forumId: ""
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
    }

    onFormChangeHandler = (e) => {
        this.setState({ threadContent: e.html })
    }

    onCategoryChangeHandler = () => {
        this.setState({ category: this.categoryRef.current.value })
    }

    onTitleChangeHandler = (e) => {
        this.setState({ title: e.target.value })
    }

    onSubmitHandler = (e) => {
        e.preventDefault(e)
        const rawBody = {
            user: this.state.user,
            title: this.state.title,
            content: this.state.threadContent,
            category: this.state.category,
        }
        const body = JSON.stringify(rawBody)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        axios.post(process.env.REACT_APP_API_URL + "/forum", body, config)
            .then((res) => {
                this.setState({ forumId: res.data, redirect: true })
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { redirect, forumId, title } = this.state
        const mdParser = new MarkdownIt()
        return (
            <div >
                <div>{redirect === false ? "" : <Redirect to={"/forum/" + forumId} />}</div>
                <Card>
                    <Card.Body>
                        <h2 className="text-center">Post a new forum</h2>
                        <hr />
                        <div>
                            <Row>
                                <Col>
                                    <h3>Intro:</h3>
                                    <p>
                                        Hello doctor, if you are here, it probably means that you want to ask
                                        something to the community, or, just want to discuss something.
                                        If you want to do so, remember to follow the rules or else your thread might be deleted.
                                    </p>
                                    <p>We use markdown! Don't know how to use it? click <a href="https://www.markdownguide.org/getting-started/">here</a> to learn how to!</p>
                                </Col>
                                <Col>
                                    <h3>Rules:</h3>
                                    <Row>
                                        <Col>
                                            <p>
                                                You can:
                                        </p>
                                            <ul>
                                                <li>Discuss about an scp</li>
                                                <li>Discuss about any document</li>
                                                <li>Discuss about a creation of a new scp</li>
                                            </ul>
                                        </Col>
                                        <Col>
                                            <p>
                                                You cannot
                                            </p>
                                            <ul>
                                                <li>Discuss about your private life/problems</li>
                                                <li>Post any NSFW content</li>
                                                <li>Discuss about politics and/or religions</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Thread title</Form.Label>
                                        <Form.Control onChange={(e) => this.onTitleChangeHandler(e)} value={title} />
                                    </Form.Group>
                                    <Form.Group>
                                        <MdEditor
                                            style={{ height: "500px" }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={(e) => this.onFormChangeHandler(e)}
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Col>
                                            <Form.Group >
                                                <Form.Control
                                                    as="select"
                                                    custom
                                                    ref={this.categoryRef}
                                                >
                                                    <option value="Scps">Scps</option>
                                                    <option value="Documents">Documents</option>
                                                    <option value="New SCP">New SCP</option>
                                                    <option value="New Document">New Document</option>
                                                    <option value="Other">Other</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Button className="EDButton" onClick={(e) => this.onSubmitHandler(e)}>Submit thread</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div >
        )
    }
}

export default NewForum