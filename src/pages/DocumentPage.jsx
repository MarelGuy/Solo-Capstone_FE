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
        const config = {
            headers: {
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken')
            }
        }
        axios.get(process.env.REACT_APP_API_URL + "/user/me", config)
            .then((res) => {
                this.setState({ user: res.data })
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.doc.likes !== this.state.doc.likes)
            this.setState({
                doc: {
                    ...this.state.doc,
                    likes: this.state.doc.likes
                }
            })
        if (prevState.user.docFavourites !== this.state.user.docFavourites)
            this.setState({
                user: {
                    ...this.state.user,
                    docFavourites: this.state.user.docFavourites
                }
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
            if (this.state.doc.likes.findIndex(like => like.userId === this.state.user._id) === -1)
                return "Like"
            return "Unlike"
        }
    }

    toggleLike = async (e) => {
        e.preventDefault(e)
        try {
            const id = this.props.match.params.id
            const body = {
                userId: this.state.user._id
            }
            const config = {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                    refreshToken: localStorage.getItem('refreshToken')
                }
            }
            const response = await axios.post(process.env.REACT_APP_API_URL + "/doc/like/" + id, body, config);
            const data = response.data
            if (!data.errors) {
                this.setState({ doc: data, isLoading: false })
            }
        } catch (error) {
            console.log(error)
            const prevDoc = this.state.doc
            this.setState({ doc: prevDoc })
        }
    }

    isFav = () => {
        if (this.state.user.docFavourites) {
            if (this.state.user.docFavourites.findIndex(fav => fav === this.state.doc._id) === -1)
                return "Favourite"
            return "Unfavourite"
        }
    }

    toggleFav = async (e) => {
        e.preventDefault(e)
        try {
            const id = this.props.match.params.id
            const config = {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                    refreshToken: localStorage.getItem('refreshToken')
                }
            }
            const response = await axios.post(process.env.REACT_APP_API_URL + "/user/fav/doc/" + id, null, config);
            const data = response.data
            if (!data.errors) {
                this.setState({ user: data, isLoading: false })
            }
        } catch (error) {
            console.log(error)
            const prevUser = this.state.user
            this.setState({ user: prevUser })
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
                                        <Button className="EDButton" onClick={(e) => this.toggleLike(e, user._id)}>{
                                            this.isLiked()
                                        }</Button>
                                        <Button style={{ marginTop: '10px' }} className="EDButton" onClick={(e) => this.toggleFav(e)}>{
                                            this.isFav()
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
