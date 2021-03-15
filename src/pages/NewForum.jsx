import React, { PureComponent } from 'react'
import axios from 'axios'
class NewForum extends PureComponent {
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
        axios.get("http://localhost:3005/user/me", config)
            .then((res) => {
                this.setState({ user: res.data })
            })
    }

    render() {
        return (
            <>
            </>
        )
    }
}

export default NewForum