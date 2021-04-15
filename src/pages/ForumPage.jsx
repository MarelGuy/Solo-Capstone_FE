import React, { PureComponent } from 'react'
import axios from 'axios';
import { Button, Card, Col, Row, Modal } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser'
import { Redirect } from 'react-router-dom'

import uniqid from 'uniqid'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'

class ForumPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            forum: {},
            isLiked: false,
            isFav: false,
            isLoading: true,
            redirect: false,
            content: "",
            show: false
        }
    }

    componentDidMount() {
        const accessToken = localStorage.getItem("accessToken")
        const refreshToken = localStorage.getItem("refreshToken")
        const id = this.props.match.params.id
        const config = {
            headers: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        }
        axios.get(process.env.REACT_APP_API_URL + "/user/me", config)
            .then((res1) => {
                axios.get(process.env.REACT_APP_API_URL + "/forum/" + id)
                    .then((res2) => {

                        this.setState({
                            user: res1.data,
                            forum: res2.data
                        })
                    })
            }).catch((err) => {
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

    onDeleteHandler = () => {
        const id = this.props.match.params.id
        axios.delete(process.env.REACT_APP_API_URL + "/forum/" + id)
            .then((res) => {
                if (res)
                    this.setState({ redirect: true })
            }).catch((error) => {
                console.log(error);
            });
    }

    isLiked = () => {
        if (this.state.forum.likes) {
            const check = this.state.forum.likes.find(like => like.userId === this.state.user._id)
            if (check === undefined || check === null)
                return false
            else
                return true
        }
    }

    toggleLike = async (e) => {
        e.preventDefault(e)
        const liked = this.isLiked()
        const prevForum = this.state.forum
        const id = this.props.match.params.id
        if (liked === true) {
            try {
                const like = this.state.forum.likes.find(like => like.userId === this.state.user._id)
                await axios.delete(process.env.REACT_APP_API_URL + "/forum/like/" + id + "/" + like._id)
            } catch (error) {
                console.log(error)
                this.setState({ forum: prevForum })
            }
        } else {
            this.setState(state => ({
                scp: {
                    ...state.forum,
                    likes: state.forum.likes.filter(like => like.userId !== this.state.user._id)
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
                await axios.post(process.env.REACT_APP_API_URL + "/forum/like/" + id, body, config).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    isFav = () => {
        if (this.state.user.forumFavourites) {
            const check = this.state.user.forumFavourites.find(fav => fav === this.state.forum._id)
            if (check === undefined || check === null)
                return false
            else
                return true

        }
    }

    toggleFav = async (e) => {
        e.preventDefault(e)
        const favved = this.isFav()
        const fav = this.state.user.forumFavourites.find(fav => fav === this.state.forum._id)
        const prevUser = this.state.user
        const id = this.props.match.params.id
        const userId = this.state.user._id
        if (favved === true) {
            this.setState(state => ({
                user: {
                    ...state.user,
                    user: state.user.forumFavourites.filter(fav => fav.forumId === this.state.forum._id)
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
        console.log("eek")
    }

    onFormChangeHandler = (e) => {
        this.setState({ content: e.html })
    }

    onFormSubmitHandler = () => {
        const id = this.props.match.params.id
        const body = {
            userId: this.state.user._id,
            content: this.state.content
        }
        const config = {
            "content-type": "application/json"
        }
        axios.post(process.env.REACT_APP_API_URL + "/forum/" + id + "/comment", body, config)
            .then((res) => {
                console.log(res.data)
            })
    }
    render() {
        const { forum, user, redirect } = this.state
        const mdParser = new MarkdownIt()

        const isAuthor = () => {
            if (forum.user === undefined || forum.user === null) {
            } else {
                if (forum.user._id === user._id) {
                    return (
                        <Card style={{ width: '100%', marginTop: '10px' }}>
                            <Card.Body>
                                <Button className="EDButton">Edit</Button>
                                <Button className="EDButton" style={{ marginTop: "7.5px" }} onClick={(e) => this.openModal(e)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    )
                } else {
                }
            }
        }
        const rating = () => {
            if (forum.likes)
                return (<p>Rating: {forum.likes.length}</p>)
        }

        const displayComments = () => {
            return (
                forum.comments.map((comment) => {
                    console.log(comment)
                    if (comment.userId === null)

                        return (
                            <Card style={{ marginTop: "15px" }} key={`list-item-${uniqid()}`}>
                                <Card.Body>
                                    <h5 className="text-center">Deleted Account</h5>
                                    {ReactHtmlParser(comment.content)}
                                    <hr />
                                    <p>Created at: {new Date(forum.createdAt).toLocaleString()}</p>
                                </Card.Body>
                            </Card >
                        )
                    else
                        return (
                            <Card style={{ marginTop: "15px" }} key={`list-item-${uniqid()}`}>
                                <Card.Body>
                                    <h5 className="text-center">{comment.userId.nickname}</h5>
                                    {ReactHtmlParser(comment.content)}
                                    <hr />
                                    <p>Created at: {new Date(forum.createdAt).toLocaleString()}</p>
                                </Card.Body>
                            </Card >
                        )
                })
            )
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
                        <p>Are you sure you want to delete this thread?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => this.closeModal(e)} variant="secondary">Close</Button>
                        <Button onClick={(e) => this.onDeleteHandler(e)} variant="primary">Yes</Button>
                    </Modal.Footer>
                </Modal>
                <Card style={{ marginBottom: '50px' }}>
                    <Card.Body>
                        <Row>
                            {redirect === false ? "" : <Redirect to="/home" />}
                            <Col sm={3}>
                                <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                        <p>Posted by: <br /> <a href={forum.user ? `/user/${forum.user._id}` : ""}>{forum.user ? forum.user.nickname : "loading..."}</a></p>
                                        {rating()}
                                        <hr />
                                        <a className="GreyAnchor" href="/home"><p className="Anchors">Main</p> </a>
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
                                    </Card.Body>
                                </Card>
                                {isAuthor()}
                            </Col>
                            <Col sm={9}>
                                <Card >
                                    <Card.Body>
                                        <h3>{forum.title}</h3>
                                        <hr />
                                        <div>{ReactHtmlParser(forum.content)}</div>
                                        <hr />
                                        <p>Created at: {new Date(forum.createdAt).toLocaleString()}</p>
                                    </Card.Body>
                                </Card>
                                <Card style={{ width: '100%', marginTop: '10px' }}>
                                    <Card.Body>
                                        <MdEditor
                                            style={{ height: '250px' }}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={(e) => this.onFormChangeHandler(e)}
                                        />
                                        <Button style={{ marginTop: '10px' }} className="EDButton" onClick={(e) => this.onFormSubmitHandler(e)}>Submit</Button>
                                    </Card.Body>
                                </Card>
                                {forum.comments === undefined ? " " : displayComments()}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card >
            </div>
        )
    }
}

/*

*/

export default ForumPage