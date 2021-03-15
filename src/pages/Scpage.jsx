import React, { PureComponent } from 'react'
import axios from 'axios';
import { Col, Row, Card, Button } from 'react-bootstrap';
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
        axios.get(process.env.REACT_APP_API_URL + "/user/me", config)
            .then((res) => {
                this.setState({ user: res.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onLikeHandler = async (e) => {
        const id = this.props.match.params.id
        e.preventDefault();
        const rawBody = {
            userId: this.state.user._id
        }
        const body = JSON.stringify(rawBody)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post("http://127.0.0.1:3005/scp/like/" + id, body, config)
            .then((res) => {
                if (res)
                    window.location.reload(true)
            }).catch((error) => {
                console.log(error);
            });

    }

    onUnlikeHandler = async (e, like) => {
        const id = this.props.match.params.id
        axios.delete(process.env.REACT_APP_API_URL + "/scp/like/" + id + "/" + like._id)
            .then((res) => {
                if (res)
                    window.location.reload(true)
            })
    }

    onFavouriteHandler = async (e) => {
        const userId = this.state.user._id
        const id = this.props.match.params.id
        e.preventDefault();
        const rawBody = {
            scpId: id
        }
        const body = JSON.stringify(rawBody)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.post(process.env.REACT_APP_API_URL + "/user/fav/" + userId, body, config)
            .then((res) => {
                if (res)
                    window.location.reload(true)
            }).catch((error) => {
                console.log(error);
            });
    }

    onUnfavouriteHandler = async (e, isFav) => {
        const userId = this.state.user._id
        const id = isFav._id
        axios.delete(process.env.REACT_APP_API_URL + "/user/fav/" + userId + "/" + id,)
            .then((res) => {
                if (res)
                    window.location.reload(true)
            }).catch((error) => {
                console.log(error);
            });
    }

    onDeleteHandler = async (e) => {
        const id = this.props.match.params.id
        axios.delete(process.env.REACT_APP_API_URL + "/scp/" + id)
            .then((res) => {
                this.setState({ redirect: true })
            }).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { scp, user, isLoading, redirect } = this.state
        const likes = scp.likes
        const isScpLiked = () => {
            if (likes === undefined) {
            } else {
                const isLiked = likes.find((like) => like.userId === user._id)
                if (isLiked === undefined) {
                    return (<Button className="ScpEDButton" onClick={(e) => this.onLikeHandler(e)}>Like</Button>)
                } else {
                    return (<Button className="ScpEDButton" onClick={(e) => this.onUnlikeHandler(e, isLiked)}>Unlike</Button>)
                }
            }
        }
        const favs = user.favourites
        const isScpFav = () => {
            if (favs === undefined) {
            } else {
                const isFav = favs.find((fav) => fav.scpId === scp._id)
                if (isFav === undefined) {
                    return (<Button className="ScpEDButton" style={{ marginTop: "7.5px" }} onClick={(e) => this.onFavouriteHandler(e)}>Favourite</Button>)
                } else {
                    return (<Button className="ScpEDButton" style={{ marginTop: "7.5px" }} onClick={(e) => this.onUnfavouriteHandler(e, isFav)}>Unfavourite</Button>)
                }
            }
        }
        const isAuthor = () => {
            if (scp.user === undefined) {
            } else {
                if (scp.user._id === user._id) {
                    return (
                        <Card style={{ width: '100%', marginTop: '10px' }}>
                            <Card.Body>
                                <Button className="ScpEDButton">Edit</Button>
                                <Button className="ScpEDButton" style={{ marginTop: "7.5px" }} onClick={(e) => this.onDeleteHandler(e)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    )
                } else {
                }
            }
        }
        return (
            <Row>
                {redirect === false ? "" : <Redirect to="/" />}
                <Col sm={3}>
                    <Card style={{ width: '100%' }}>
                        <Card.Body>
                            <p>Documents: {isLoading === true ? "loading..." : scp.linked_Documents.length} {
                                isLoading === true
                                    ? ""
                                    : scp.linked_Documents.map((document) => {
                                        return <li key={`list-item-${uniqid()}`}><a className="ScpGreyAnchor" href={`/scp/${this.props.match.params.id}/doc/${document._id}`}>{document.title}</a></li>
                                    })
                            }</p>
                            <p>Rating: {isLoading === true ? "loading..." : scp.likes.length}</p>
                            <hr />
                            <a className="ScpGreyAnchor" href="/"><p className="ScpAnchors">Main</p> </a>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '100%', marginTop: '10px' }}>
                        <Card.Body>
                            {isScpLiked()}
                            {isScpFav()}
                        </Card.Body>
                    </Card>
                    {isAuthor()}
                </Col>
                <Col sm={7} >
                    <Card style={{ width: '133%' }} id="ScpMarginMe">
                        <Card.Body>
                            <h3>{scp.item}</h3>
                            <hr />
                            {ReactHtmlParser(scp.content)}
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        )
    }
}

export default Scpage