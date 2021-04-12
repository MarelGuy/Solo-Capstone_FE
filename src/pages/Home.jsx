import React, { PureComponent } from 'react'
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
            <div className="text-center">
                <div >
                    <p>WARNING: THE FOUNDATION DATABASE IS</p>
                    <h1 style={{ marginTop: "-15px", color: '#650000', fontWeight: '700' }}>CLASSIFIED</h1>
                    <p>ACCESS BY UNAUTHORIZED PERSONNEL IS STRICTLY PROHIBITED <br />
                    PERPETRATORS WILL BE TRACKED, LOCATED, AND DETAINED</p>
                </div>
                <hr />
                <div>
                    <h2>Welcome {user.nickname}</h2>
                    <p>The SCP Foundation database it's here at your service for finding, adding, modifying and rating other's SCPs. <br />
                    Be aware of your ranking level.</p>
                    <hr />
                    <p>Want to create an scp? click <a href="/new/scp">HERE</a> to create one.<br />
                    Want to create a forum? click <a href="/new/forum">HERE</a>to create one</p>
                </div>
                <hr />
            </div>
        )
    }
}

export default Home