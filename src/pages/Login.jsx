import axios from 'axios'
import React, { PureComponent } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import logo from '../assets/images/logos/NavLogo.png'

class Login extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            redirect: false,
            failed: false
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler(e) {
        e.preventDefault()
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        const rawBody = {
            email: this.state.email,
            password: this.state.password
        }
        const body = JSON.stringify(rawBody)
        axios.post(process.env.REACT_APP_API_URL + "/user/login", body, config)
            .then((response) => {
                setTimeout(this.redirectState, 0)
                this.setState({ registered: true });
                const res = response.data
                localStorage.setItem("accessToken", res.accessToken)
                localStorage.setItem("refreshToken", res.refreshToken)
            }).catch((error) => {
                console.log(error);
                this.setState({ failed: true })
            });



    }

    redirectState = () => this.setState({ redirect: true })

    render() {
        const { email, password, redirect, failed } = this.state
        return (
            <Row className="justify-content-md-center" style={{ marginTop: '12%' }}>
                <div>{redirect === false ? "" : <Redirect to="/home" />}</div>
                <Col md={6}>
                    <Card style={{ width: '100%' }}>
                        <Row className="justify-content-md-center" style={{ marginTop: '5%' }}>
                            <Row>
                                <Col sm={3} >
                                    <img id="ScpNavImg" src={logo} alt="SCP Logo" />
                                </Col>
                                <Col sm={9}>
                                    <h2 className="ScpNavTitle" >SCP Foundation</h2>
                                    <h4 className="ScpNavTitle" >Secure. Contain. Protect.</h4>
                                </Col>
                            </Row>
                        </Row>
                        <Card.Body>
                            <Card.Title className="text-center">
                                <hr />
                                Login
                                <hr />
                            </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control placeholder="Your email" name="email" required value={email} onChange={(e) => this.onChangeHandler(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Your password" name="password" required value={password} onChange={(e) => this.onChangeHandler(e)} />
                                </Form.Group>
                                <hr />
                                <Row>
                                    <Col sm={2}>
                                        <Button className="ScpLogUp" onClick={(e) => { this.onSubmitHandler(e) }}>Login</Button>
                                    </Col>
                                    <Col sm={6}>{failed === false ? "" : <p style={{ color: 'red', marginTop: '-5px', marginBottom: '-5px' }}>Login failed. <br />Email or password are wrong</p>}</Col>
                                </Row>
                            </Form>
                            <hr />
                            <h6 className="text-center"><a href="/signup">Not registered yet? Register now.</a></h6>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        )
    }
}

export default Login