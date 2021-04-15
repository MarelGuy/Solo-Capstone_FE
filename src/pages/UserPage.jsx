import React, { PureComponent } from 'react'
import axios from 'axios';
import { Button, Card, Col, Form, Row, Modal } from 'react-bootstrap';
import uniqid from 'uniqid';
import { Redirect } from 'react-router-dom'

class UserPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            image: "",
            imageUpload: false,
            imagePreview: "",
            nickname: "",
            email: "",
            scpFavs: "",
            docFavs: "",
            forumFavs: "",
            redirect: false,
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
                this.setState({
                    nickname: res.data.nickname,
                    email: res.data.email
                })
                setTimeout(0, this.fetchFavs())
            })

    }

    fetchFavs = async () => {
        const userId = this.state.user._id
        axios.get(process.env.REACT_APP_API_URL + "/user/" + userId + "/favs")
            .then((res) => {
                this.setState({
                    scpFavs: res.data.scpFavourites,
                    docFavs: res.data.docFavourites,
                    forumFavs: res.data.forumFavourites
                })
            })
    }

    onImgChangeHandler = async (e) => {
        const userId = this.state.user._id
        const url = process.env.REACT_APP_API_URL + "/user/" + userId + "/image"
        if (e.target.files && e.target.files[0]) {
            const fd = new FormData();
            fd.append("avatar", e.target.files[0])
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            axios.post(url, fd, config)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        image: e.target.files[0],
                        imageUpload: true,
                        imagePreview: URL.createObjectURL(e.target.files[0])
                    })
                })
        }
    }

    onChangeHandler = async (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const userId = this.state.user._id
        const body = JSON.stringify({
            "nickname": this.state.nickname,
            "email": this.state.email
        })
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        axios.put(process.env.REACT_APP_API_URL + "/user/" + userId, body, config)
            .then((res) => {
                console.log(res)
            })
    }

    onDeleteHandler = async (e) => {
        const userId = this.state.user._id
        axios.delete(process.env.REACT_APP_API_URL + "/user/" + userId).then(() => {
            this.setState({ redirect: true })
        })
    }

    onDescSubmitHandler = async (e) => {
        e.preventDefault(e)
        const userId = this.state.user._id
        const body = JSON.stringify({
            userDesc: this.state.description
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.put(process.env.REACT_APP_API_URL + "/user/add-desc/" + userId, body, config)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    openModal = (e) => {
        if (e)
            e.preventDefault(e)
        this.setState({ show: true })
    }

    closeModal = (e) => {
        if (e)
            e.preventDefault(e)
        this.setState({ show: false })
    }

    render() {
        const {
            user,
            imageUpload,
            imagePreview,
            nickname,
            email,
            scpFavs,
            forumFavs,
            docFavs,
            redirect
        } = this.state
        return (
            <div>
                <Modal
                    onHide={this.closeModal}
                    backdrop="static"
                    keyboard={false}
                    show={this.state.show}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this account?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => this.closeModal(e)} variant="secondary">Close</Button>
                        <Button onClick={(e) => this.onDeleteHandler(e)} variant="primary">Yes</Button>
                    </Modal.Footer>
                </Modal>
                <Card>
                    <Card.Body>
                        {redirect === false ? "" : <Redirect to="/signup" />}
                        <div className="text-center">
                            <h4>Welcome to your profile page {user.nickname}! Here you can choose to modify your profile or to just see it</h4>
                        </div>
                        <Row>
                            <Col>
                                <Card style={{ width: '100%', marginTop: "10px" }}>
                                    <Card.Body className="text-center">
                                        <h6 >Your profile avatar</h6>
                                        {imageUpload === false
                                            ? <img src={user.avatar} alt="profile pic" className="UPImg" />
                                            : <img src={imagePreview} alt="profile pic" className="UPImg" />}
                                        <p></p>
                                        <p>Want to change it? upload a file here</p>
                                        <p>The image will update automatically</p>
                                        <input type="file" onChange={(e) => this.onImgChangeHandler(e)} />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '100%%', marginTop: "10px" }}>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Change your nickname</Form.Label>
                                                <Form.Control name="nickname" value={nickname} onChange={(e) => this.onChangeHandler(e)} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Change your email</Form.Label>
                                                <Form.Control name="email" value={email} onChange={(e) => this.onChangeHandler(e)} />
                                            </Form.Group>
                                            <Button className="EDButton" onClick={(e) => this.onSubmitHandler(e)}>Submit</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '100%', marginTop: '10px', marginBottom: '100px', height: '43.6%' }}>
                                    <Card.Body className="text-center">
                                        <h3>Favourites</h3>
                                        <Row>
                                            <Col>
                                                <h6>Scps</h6>
                                                {scpFavs === ""
                                                    ? ''
                                                    : scpFavs.map((scp) => {
                                                        return (
                                                            <div key={`list-item-${uniqid()}`}>
                                                                <a href={"/scp/" + scp._id}>{scp.item}</a>
                                                                <br />
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <br />
                                            </Col>
                                            <Col>
                                                <h6>Forums</h6>
                                                {forumFavs === ""
                                                    ? ''
                                                    : forumFavs.map((forum) => {
                                                        return (
                                                            <div key={`list-item-${uniqid()}`}>
                                                                <a href={"/forum/" + forum._id}>{forum.title}</a>
                                                                <br />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Col>
                                            <Col>
                                                <h6>Documents</h6>
                                                {docFavs === ""
                                                    ? ''
                                                    : docFavs.map((doc) => {
                                                        return (
                                                            <div key={`list-item-${uniqid()}`}>
                                                                <a href={"/doc/" + doc._id}>{doc.title}</a>
                                                                <br />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Card style={{ width: '100%', marginTop: '10px' }}>
                            <Card.Body>
                                <Button style={{ width: '100%', backgroundColor: "red", borderColor: "red" }} onClick={(e) => this.openModal(e)}>
                                    Delete account
                                </Button>
                            </Card.Body>
                        </Card>
                        <Row style={{ marginTop: '10px' }}>
                            <Col>
                                <Card style={{ width: '100%', height: '100%' }}>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Add a description</Form.Label>
                                                <Form.Control name="description" value={user.userDesc} onChange={(e) => this.onChangeHandler(e)} as="textarea" />
                                            </Form.Group>
                                            <Button className="EDButton" onClick={(e) => this.onDescSubmitHandler(e)}>Submit</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default UserPage