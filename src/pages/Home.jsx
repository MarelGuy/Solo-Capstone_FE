import React, { PureComponent } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios';
class Home extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
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

    render() {
        const user = this.state.user
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card className="text-center">
                        <Card.Body>
                            <p>WARNING: THE FOUNDATION DATABASE IS</p>
                            <h1 style={{ marginTop: "-15px", color: '#650000', fontWeight: '700' }}>CLASSIFIED</h1>
                            <p>ACCESS BY UNAUTHORIZED PERSONNEL IS STRICTLY PROHIBITED <br />
                    PERPETRATORS WILL BE TRACKED, LOCATED, AND DETAINED</p>
                        </Card.Body>
                    </Card>
                    <Card className="text-center mt-2">
                        <Card.Body>
                            <h2>Welcome {user.nickname}</h2>
                            <p>The SCP Foundation database it's here at your service for finding, adding, modifying and rating other's SCPs. <br />
                    Be aware of your ranking level.</p>
                            <hr />
                            <p>Want to create an scp? click <a href="/new/scp">HERE</a> to create one.<br />
                    Want to create a forum? click <a href="/new/forum">HERE</a> to create one</p>
                        </Card.Body>
                    </Card>
                    <Card className="text-center mt-2">
                        <Card.Body>
                            <h3>What is an SCP?</h3>
                            <p>An SCP is an entity that defies in any obvious way the laws of physics.
                            As an example we can take a normal human,
                            Suddently it starts to fly around and do mess among the city.
                            Scientists can't explain why and how he can fly and so they
                            contant the SCP Foundation to study the subject after it's captured.
                            Then if there is no explaination it will be classified as an SCP becuase
                            no one can explain with normal laws and rules of physicshow he can fly</p>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        )
    }
}

export default Home