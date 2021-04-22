import axios from 'axios'
import React, { PureComponent } from 'react';
import { Redirect } from "react-router-dom";
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import logo from '../assets/images/logos/NavLogo.png'
import Recaptcha from "react-recaptcha"
class Signup extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            nickname: "",
            email: "",
            password: "",
            confirmPassword: "",
            isPassWrong: false,
            redirect: false,
            registered: false
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler(e) {
        if (this.state.password === this.state.confirmPassword) {
            if (this.state.nickname === "" && this.state.email === "" && this.state.password) {

            } else {
                e.preventDefault()
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                };
                const rawBody = {
                    nickname: this.state.nickname,
                    email: this.state.email,
                    password: this.state.password,
                    role: "User",
                    avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fiupac.org%2Fwp-content%2Fuploads%2F2018%2F05%2Fdefault-avatar.png&f=1&nofb=1"
                }
                const body = JSON.stringify(rawBody)
                axios.post(process.env.REACT_APP_API_URL + "/user/register", body, config)
                    .then((response) => {
                    }).catch((error) => {
                        console.log(error);
                    });
                setTimeout(this.redirectState, 5000)
                this.setState({ registered: true });
            }
        } else {
            this.setState({ isPassWrong: true })
        }
    }

    redirectState = () => this.setState({ redirect: true })

    render() {
        const { nickname, email, password, redirect, registered, confirmPassword, isPassWrong } = this.state
        return (
            <Row className="justify-content-md-center" style={{ marginTop: '8%' }}>
                <div>{redirect === false ? "" : <Redirect to="/login" />}</div>
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
                                Register
                                <hr />
                            </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Nickname</Form.Label>
                                    <Form.Control placeholder="Your nickname" name="nickname" value={nickname} required onChange={(e) => this.onChangeHandler(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control placeholder="Your email" name="email" value={email} required onChange={(e) => this.onChangeHandler(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Your password" name="password" value={password} required onChange={(e) => this.onChangeHandler(e)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword} required onChange={(e) => this.onChangeHandler(e)} />
                                </Form.Group>
                                <Form.Group inline="true">
                                    <Form.Check label="By registering you accept to keep every information confidential" />
                                </Form.Group>
                                <Form.Group required>
                                    <Recaptcha
                                        sitekey="6LfstLQaAAAAAFe-nR8NKioHtObAtS1u42cLxwLy"
                                    />
                                </Form.Group>
                                <hr />
                                <Row>
                                    <Col sm={3}>
                                        <Button type="submit" className="ScpLogUp" onClick={(e) => { this.onSubmitHandler(e) }}>Register</Button>
                                    </Col>
                                    <Col sm={6}>{registered === false ? "" : <p style={{ marginTop: '-5px', marginBottom: '-5px' }}>Thanks for registering.<br />Welcome To The Foundation</p>}</Col>
                                    <Col sm={6}>{isPassWrong === false ? "" : <p>Passwords are not matching</p>}</Col>
                                </Row>
                            </Form>
                            <hr />
                            <h6 className="text-center"><a href="/signup">Already signed up? Login now.</a></h6>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        )
    }
}

export default Signup