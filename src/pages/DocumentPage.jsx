import React, { PureComponent } from "react";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser'
import { Redirect } from 'react-router-dom'
class DocPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            doc: "",
            user: {},
            isLoading: true,
            redirect: false,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(process.env.REACT_APP_API_URL + `/doc/${id}`)
            .then((res) => {
                if (res.status === 200)
                    this.setState({ doc: res.data, isLoading: false });
                console.log(res)
            });
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

    onDeleteHandler = (e) => {
        const id = this.props.match.params.id
        axios.delete(process.env.REACT_APP_API_URL + "/doc/" + id)
            .then((res) => {
                this.setState({ redirect: true })
            }).catch((error) => {
                console.log(error);
            });
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

    isLiked = () => {
        if (this.state.doc.likes) {
            const check = this.state.doc.likes.find(like => like.userId === this.state.user._id)
            if (check === undefined || check === null)
                return false
            else
                return true
        }
    }

    toggleLike = async (e) => {
        e.preventDefault(e)
        const liked = this.isLiked()
        const prevDoc = this.state.doc
        const id = this.props.match.params.id
        if (liked === true) {
            try {
                const like = this.state.doc.likes.find(like => like.userId === this.state.user._id)
                await axios.delete(process.env.REACT_APP_API_URL + "/doc/like/" + id + "/" + like._id)
            } catch (error) {
                console.log(error)
                this.setState({ doc: prevDoc })
            }
        } else {
            this.setState(state => ({
                doc: {
                    ...state.doc,
                    likes: state.doc.likes.filter(like => like.userId !== this.state.user._id)
                }
            }))
            try {
                const rawBody = {
                    userId: this.state.user._id
                }
                const body = JSON.stringify(rawBody)
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                };
                await axios.post(process.env.REACT_APP_API_URL + "/ doc/like/" + id, body, config).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    isFav = () => {
        if (this.state.user.docFavourites) {
            const check = this.state.user.docFavourites.find(fav => fav === this.state.scp._id)
            if (check === undefined || check === null)
                return false
            else
                return true

        }
    }

    toggleFav = async (e) => {
        e.preventDefault(e)
        const favved = this.isFav()
        const fav = this.state.user.docFavourites.find(fav => fav === this.state.doc._id)
        const prevUser = this.state.user
        const id = this.props.match.params.id
        const userId = this.state.user._id
        if (favved === true) {
            this.setState(state => ({
                user: {
                    ...state.user,
                    user: state.user.docFavourites.filter(fav => fav.docId === this.state.doc._id)
                }
            }))
            try {
                await axios.delete(process.env.REACT_APP_API_URL + "/user/fav/doc/" + userId + "/" + fav,)
            } catch (error) {
                console.log(error)
                this.setState({ user: prevUser })
            }
        } else {
            try {
                const body = JSON.stringify({
                    _id: id
                })
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                };
                await axios.post(process.env.REACT_APP_API_URL + "/user/fav/scp/" + userId, body, config).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }


    render() {
        const { isLoading, doc, user, redirect } = this.state
        const isAuthor = () => {
            if (doc.user === undefined || doc.user === null) {
            } else {
                if (doc.user._id === user._id) {
                    return (
                        <Card style={{ width: '100%', marginTop: '10px' }}>
                            <Card.Body>
                                <Button className="EDButton">Edit</Button>
                                <Button className="EDButton" style={{ marginTop: "7.5px" }} onClick={(e) => this.openModal(e)}>Delete</Button></Card.Body>
                        </Card>
                    )
                } else {
                }
            }
        }

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
                        <p>Are you sure you want to delete this scp?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => this.closeModal(e)} variant="secondary">Close</Button>
                        <Button onClick={(e) => this.onDeleteHandler(e)} variant="primary">Yes</Button>
                    </Modal.Footer>
                </Modal>
                <Card>
                    {redirect === false ? "" : <Redirect to={`/scp/${doc.for}`} />}
                    <Card.Body>
                        <Row>
                            <Col sm={3}>
                                <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                        <p>Rating: {!doc ? "loading..." : doc.likes.length}</p>
                                        <hr />
                                        <a className="ScpGreyAnchor" href="/home"><p className="ScpAnchors">Main</p> </a>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '100%', marginTop: '10px' }}>
                                    <Card.Body>
                                        <Button className="EDButton" onClick={(e) => this.toggleLike(e)}>{
                                            this.isLiked()
                                                ? "Unlike"
                                                : "Like"
                                        }</Button>
                                        <Button style={{ marginTop: '10px' }} className="EDButton" onClick={(e) => this.toggleFav(e)}>{
                                            this.isFav()
                                                ? "Unfavourite"
                                                : "Favourite"
                                        }</Button>
                                        <Button style={{ marginTop: '10px' }} className="EDButton" href={`/scp/${doc.for}`} >View SCP</Button>
                                    </Card.Body>
                                </Card>
                                {isAuthor()}
                            </Col>
                            <Col sm={9}>
                                <Card style={{ width: "100%" }}>
                                    <Card.Body>
                                        <h3>{isLoading === true ? "loading..." : doc.title}</h3>
                                        <hr />
                                        {ReactHtmlParser(doc.content)}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default DocPage;
