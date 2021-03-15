import React, { PureComponent } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser'

class DocumentPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            document: "",
            user: {},
            isLoading: true
        };
    }

    componentDidMount() {
        const docId = this.props.match.params.docId;
        const scpId = this.props.match.params.scpId;
        axios.get(`http://localhost:3005/scp/${scpId}`).then((res) => {
            const document = res.data.linked_Documents.find(doc => doc._id === docId)
            this.setState({ document, isLoading: false });
        });
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
        const { isLoading, document } = this.state
        return (
            <Card style={{ width: "104%" }}>
                <Card.Body>
                    <h3>{isLoading === true ? "loading..." : document.title}</h3>
                    <hr />
                    {ReactHtmlParser(document.content)}
                </Card.Body>
            </Card>
        );
    }
}

export default DocumentPage;
