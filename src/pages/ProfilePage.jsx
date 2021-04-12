import React, { PureComponent } from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import axios from 'axios';
import uniqid from 'uniqid'

class ProfilePage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            scpFavs: "",
            forumFavs: "",
            docFavs: "",
            me: {}
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
                this.setState({ me: res.data })
            })
        axios.get(process.env.REACT_APP_API_URL + "/user/" + this.props.match.params.id, config)
            .then((res) => {
                this.setState({ user: res.data })
                this.fetchFavs()
            })
    }

    fetchFavs = async () => {
        const userId = this.state.user._id
        axios.get(process.env.REACT_APP_API_URL + "/user/" + userId + "/favs")
            .then((res) => {
                this.setState({
                    scpFavs: res.data.scpFavourites,
                    forumFavs: res.data.forumFavourites,
                    docFavs: res.data.docFavourites
                })
            })
    }

    render() {
        let { user,
            scpFavs,
            forumFavs,
            docFavs,
            me } = this.state
        const itsMe = () => {
            if (user._id === me._id) {
                return (
                    <Card style={{ marginTop: "10px", width: "100%" }}>
                        <Card.Body>
                            <h5>Hey! That's your profile! If you want to change things up go <a href="/me">here</a></h5>
                        </Card.Body>
                    </Card>
                )
            }
        }
        return (
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Row>
                        <Col sm={6}>
                            <Card style={{ width: '100%' }}>
                                <Card.Body>
                                    <img style={{ width: '75%' }} src={user.avatar} alt="" />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '100%' }}>
                                <Card.Body>
                                    <h3>{user.nickname}</h3>
                                </Card.Body>
                            </Card>
                            <hr />
                            <Card style={{ width: '100%' }}>
                                <Card.Body>
                                    <p>{user.userDesc}</p>
                                </Card.Body>
                            </Card>
                            <hr />
                            <Card style={{ width: '100%', overflowY: 'scroll' }} >
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
                            {itsMe()}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default ProfilePage