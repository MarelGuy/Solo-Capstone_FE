import React, { PureComponent } from 'react'
import axios from 'axios'
import { Card, Col, Row } from 'react-bootstrap'
import uniqid from 'uniqid'

class SearchPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            result: {}
        }
    }

    async componentDidMount() {
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
        try {
            const scps = await axios.get(process.env.REACT_APP_API_URL + "/scp")
            const forums = await axios.get(process.env.REACT_APP_API_URL + "/forum")
            const docs = await axios.get(process.env.REACT_APP_API_URL + "/doc")
            const users = await axios.get(process.env.REACT_APP_API_URL + "/user")

            this.result(scps.data, forums.data, docs.data, users.data)
        } catch (err) {
            console.log(err)
        }
    }

    result = async (scps, forums, docs, users) => {
        const condition = this.props.match.params.data

        const findScps = await scps.filter(scp => scp.item.toLowerCase().includes(condition.toLowerCase()))
        const findForums = await forums.filter(forum => forum.title.toLowerCase().includes(condition.toLowerCase()))
        const findDocs = await docs.filter(doc => doc.title.toLowerCase().includes(condition.toLowerCase()))
        const findDocsByScp = await docs.filter(doc => doc.title.toLowerCase().includes(condition.toLowerCase()))
        const findUsers = await users.filter(user => user.nickname.toLowerCase().includes(condition.toLowerCase()))

        const results = {
            scps: findScps,
            forums: findForums,
            docs: findDocs,
            scpDocs: findDocsByScp,
            users: findUsers
        }
        this.setState({ results: results })
    }

    render() {
        const result = this.state.results

        const displayScps = () => {
            if (result) {
                if (result.scps.length > 0) {
                    const scps = result.scps.map(scp => {
                        return (
                            <a key={uniqid()} href={`/scp/${scp._id}`}>
                                <Card key={uniqid()} className="text-center SCPSearchComponent">
                                    <Card.Body>
                                        {scp.item}
                                    </Card.Body>
                                </Card>
                            </a>
                        )
                    })
                    return scps
                } else {
                    return (
                        <Card className="text-center" >
                            <Card.Body>
                                Couldn't find any scp
                            </Card.Body>
                        </Card>
                    )
                }
            }
        }
        const displayForums = () => {
            if (result) {
                if (result.forums.length > 0) {
                    const forums = result.forums.map(forum => {
                        return (
                            <a key={uniqid()} href={`/forum/${forum._id}`}>
                                <Card key={uniqid()} className="text-center SCPSearchComponent">
                                    <Card.Body>
                                        {forum.title}
                                    </Card.Body>
                                </Card>
                            </a>
                        )
                    })
                    return forums
                } else {
                    return (
                        <Card className="text-center" >
                            <Card.Body>
                                Couldn't find any forum
                            </Card.Body>
                        </Card>
                    )
                }
            }
        }
        const displayDocs = () => {
            if (result) {
                if (result.docs.length > 0) {
                    const docs = result.docs.map(doc => {
                        return (
                            <a key={uniqid()} href={`/doc/${doc._id}`}>
                                <Card key={uniqid()} className="text-center SCPSearchComponent">
                                    <Card.Body>
                                        {doc.item}
                                    </Card.Body>
                                </Card>
                            </a>
                        )
                    })
                    return docs
                } else {
                    return (
                        <Card className="text-center" >
                            <Card.Body>
                                Couldn't find any document
                            </Card.Body>
                        </Card>
                    )
                }
            }
        }
        const displayScpDocs = () => {
            if (result) {
                if (result.scpDocs.length > 0) {
                    const scpDocs = result.scpDocs.map(scpDoc => {
                        return (
                            <a key={uniqid()} href={`/doc/${scpDoc._id}`}>
                                <Card key={uniqid()} className="text-center SCPSearchComponent">
                                    <Card.Body>
                                        {scpDoc.item}
                                    </Card.Body>
                                </Card>
                            </a>
                        )
                    })
                    return scpDocs
                } else {
                    return (
                        <Card className="text-center" >
                            <Card.Body>
                                Couldn't find any SCP document
                            </Card.Body>
                        </Card>
                    )
                }
            }
        }
        const displayUsers = () => {
            if (result) {
                if (result.users.length > 0) {
                    const users = result.users.map(user => {
                        return (
                            <a key={uniqid()} href={`/user/${user._id}`}>
                                <Card key={uniqid()} className="text-center SCPSearchComponent">
                                    <Card.Body>
                                        {user.nickname}
                                    </Card.Body>
                                </Card>
                            </a>
                        )
                    })
                    return users
                } else {
                    return (
                        <Card className="text-center" >
                            <Card.Body>
                                Couldn't find any user
                            </Card.Body>
                        </Card>
                    )
                }
            }
        }

        return (
            <div>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Body>
                                    <h2>Scps:</h2>
                                    {displayScps()}
                                </Card.Body>
                            </Col>
                            <Col>
                                <Card.Body>
                                    <h2>Forums:</h2>
                                    {displayForums()}
                                </Card.Body>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '10px' }}>
                            <Col>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <h2>Documents:</h2>
                                            {displayDocs()}
                                        </Col>
                                        <Col>
                                            <h2>SCP Docs:</h2>
                                            {displayScpDocs()}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Col>
                            <Col>
                                <Card.Body>
                                    <h2>Users:</h2>
                                    {displayUsers()}
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default SearchPage