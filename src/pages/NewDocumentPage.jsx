import React, { PureComponent } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import axios from 'axios';
import { Redirect } from "react-router-dom"

class NewDocumentPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            content: "",
            redirect: false,
            docId: "",
            title: ""
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
        this.setState({ content: e.html })
    }

    onTitleChangeHandler = (e) => {
        this.setState({ title: e.target.value })
    }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        const rawBody = {
            user: this.state.user._id,
            title: this.state.title,
            content: this.state.content,
            for: this.props.match.params.scpId
        }
        const body = JSON.stringify(rawBody)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post("http://127.0.0.1:3005/doc/" + this.props.match.params.scpId, body, config)
            .then((res) => {
                this.setState({ docId: res.data, redirect: true })
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const mdParser = new MarkdownIt()
        const { redirect, docId, title } = this.state
        return (
            <div id="NewScpPage">
                <div>{redirect === false ? "" : <Redirect to={"/doc/" + docId} />}</div>
                <Form>
                    <h2 className="NewScpsH2, text-center mb-3">Create a new document</h2>
                    <Form.Group>
                        <MdEditor
                            style={{ height: "500px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={(e) => this.onFormChangeHandler(e)}
                        />
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>Document title:</Form.Label>
                        <Col sm={8.5}>
                            <Form.Control value={title} required onChange={(e) => this.onTitleChangeHandler(e)} />
                        </Col>
                        <Col >
                            <Button className="ScpNavButton" onClick={(e) => { this.onSubmitHandler(e) }}>Submit</Button>
                        </Col>
                    </Form.Group >
                </Form>
            </div >
        )
    }
}



export default NewDocumentPage