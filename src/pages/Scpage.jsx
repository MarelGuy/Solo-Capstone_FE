import React, { PureComponent } from 'react'
import axios from 'axios';
import { Col, Row, Card, Button, Modal } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser'
import uniqid from 'uniqid'
import { Redirect } from 'react-router-dom'
class Scpage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            scp: {},
            user: {},
            isLiked: false,
            isFav: false,
            isLoading: true,
            redirect: false,
            show: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        const config = {
            headers: {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }
        axios.get(process.env.REACT_APP_API_URL + "/scp/" + id)
            .then((res) => {
                this.setState({ scp: res.data, isLoading: false })
            })
            .catch((error) => {
                console.log(error)
            })
        axios.get(process.env.REACT_APP_API_URL + "/user/me", config).catch((err) => {
            console.log(err)
        })
            .then((res) => {
                this.setState({ user: res.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onDeleteHandler = (e) => {
        const id = this.props.match.params.id
        axios.delete(process.env.REACT_APP_API_URL + "/scp/" + id)
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
        if (this.state.scp.likes) {
            const check = this.state.scp.likes.find(like => like.userId === this.state.user._id)
            if (check === undefined || check === null)
                return false
            else
                return true
        }
    }

    toggleLike = async (e) => {
        e.preventDefault(e)
        const liked = this.isLiked()
        const prevScp = this.state.scp
        const id = this.props.match.params.id
        if (liked === true) {
            try {
                const like = this.state.scp.likes.find(like => like.userId === this.state.user._id)
                await axios.delete(process.env.REACT_APP_API_URL + "/scp/like/" + id + "/" + like._id)
            } catch (error) {
                console.log(error)
                this.setState({ scp: prevScp })
            }
        } else {
            this.setState(state => ({
                scp: {
                    ...state.scp,
                    likes: state.scp.likes.filter(like => like.userId !== this.state.user._id)
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
                await axios.post(process.env.REACT_APP_API_URL + "/scp/like/" + id, body, config).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    isFav = () => {
        if (this.state.user.scpFavourites) {
            const check = this.state.user.scpFavourites.find(fav => fav === this.state.scp._id)
            if (check === undefined || check === null)
                return false
            else
                return true

        }
    }

    toggleFav = async (e) => {
        e.preventDefault(e)
        const favved = this.isFav()
        const fav = this.state.user.scpFavourites.find(fav => fav === this.state.scp._id)
        const prevUser = this.state.user
        const id = this.props.match.params.id
        const userId = this.state.user._id
        if (favved === true) {
            this.setState(state => ({
                user: {
                    ...state.user,
                    user: state.user.scpFavourites.filter(fav => fav.scpId === this.state.scp._id)
                }
            }))
            try {
                await axios.delete(process.env.REACT_APP_API_URL + "/user/fav/scp/" + userId + "/" + fav,)
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
        const { scp, user, isLoading, redirect } = this.state

        const isAuthor = () => {
            if (scp.user === undefined || scp.user === null) {
            } else {
                if (scp.user._id === user._id) {
                    return (
                        <Card style={{ width: '100%', marginTop: '10px' }}>
                            <Card.Body>
                                <Button className="EDButton" href={`/scp/${this.props.match.params.id}/edit/`}>Edit</Button>
                                <Button className="EDButton" style={{ marginTop: "7.5px" }} onClick={(e) => this.openModal(e)}>Delete</Button>
                                <Button className="EDButton" style={{ marginTop: "7.5px" }} href={`/new/${this.props.match.params.id}/doc/`}>Add Document</Button>
                            </Card.Body>
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
                    <Card.Body>
                        <Row>
                            {redirect === false ? "" : <Redirect to="/home" />}
                            <Col sm={3}>
                                <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                        <p>Posted by: <br /> <a href={scp.user ? `/user/${scp.user._id}` : ""}>{scp.user ? scp.user.nickname : "Not found"}</a></p>
                                        <p>Documents: {isLoading === true ? "loading..." : scp.linked_Documents.length} {
                                            isLoading === true
                                                ? ""
                                                : scp.linked_Documents.map((document) => {
                                                    return <li key={`list-item-${uniqid()}`}><a className="ScpGreyAnchor" href={`/doc/${document._id}`}>{document.title}</a></li>
                                                })
                                        }</p>
                                        <p>Rating: {isLoading === true ? "loading..." : scp.likes.length}</p>
                                        <hr />
                                        <a className="ScpGreyAnchor" href="/home"><p className="ScpAnchors">Main</p> </a>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '100%', marginTop: '10px' }}>
                                    <Card.Body>
                                        <Button className="EDButton" onClick={(e) => this.toggleLike(e)}>{
                                            this.isLiked() === true
                                                ? "Unlike"
                                                : "Like"
                                        }</Button>
                                        <Button style={{ marginTop: '10px' }} className="EDButton" onClick={(e) => this.toggleFav(e)}>{
                                            this.isFav() === true
                                                ? "Unfavourite"
                                                : "Favourite"
                                        }</Button>
                                    </Card.Body>
                                </Card>
                                {isAuthor()}
                            </Col>
                            <Col sm={7} >
                                <Card style={{ width: '130%' }} id="ScpMarginMe">
                                    <Card.Body>
                                        <h3>{scp.item}</h3>
                                        <hr />
                                        {ReactHtmlParser(scp.content)}
                                        <hr />
                                        <p>Created at: {new Date(scp.createdAt).toLocaleString()}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row >
                    </Card.Body>
                </Card>
            </div >
        )
    }
}

export default Scpage