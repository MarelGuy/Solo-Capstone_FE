import React, { PureComponent } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
class NewScp extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            user: "",
            item: "",
            objectClass: "",
            description: "",
            containmentProcedures: "",
            imagePreview: "",
            image: ""
        }
    }

    onChangeHanlder = (e) => {
        if (e.target.name === "image") {
            this.setState({ imagePreview: URL.createObjectURL(e.target.files[0]) });
            this.setState({ image: e.target.files[0] });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onChangeImageHandler = (e) => {
    }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user', this.state.user);
        formData.append('item', this.state.item)
        formData.append('objectClass', this.state.objectClass);
        formData.append('description', this.state.description);
        formData.append('containmentProcedures', this.state.containmentProcedures);
        formData.append('image', this.state.image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://127.0.0.1:3005/scp/", await formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }


    render() {
        const { user, item, objectClass, description, containmentProcedures, imagePreview } = this.state
        return (
            <div>
                <Row>
                    <Col>
                        <h2 className="NewScpsH2">Create a new scp</h2>
                        <p>Do you want to create an SCP? Well, you can, but you need to follow some rules.
                        Your new SCP must have a new item number, an example would be:
                        If your new SCP it's SCP-012, but we have SCP-012 and SCP-013, then you need to create SCP-014.
                        The description must meet the object class, you shouldn't write that an SCP kills everyone but it's a safe/thaumiel class.
                        Containment procedures are not strictly needed, but still, we suggest to put them in. </p>
                        <h2 className="NewScpsH2">Image upload preview: </h2>
                        <img src={imagePreview} alt="" width="70%" />
                    </Col>
                    <Col>
                        <h2 className="NewScpsH2">New SCP:</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>User</Form.Label>
                                <Form.Control placeholder="Your username" name="user" value={user} required onChange={(e) => { this.onChangeHanlder(e) }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Item number</Form.Label>
                                <Form.Control placeholder="SCP number" name="item" value={item} required onChange={(e) => { this.onChangeHanlder(e) }} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Object Class</Form.Label>
                                <Form.Control placeholder="SCP Object Class" name="objectClass" value={objectClass} required onChange={(e) => { this.onChangeHanlder(e) }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control placeholder="SCP description" name="description" value={description} required onChange={(e) => { this.onChangeHanlder(e) }} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Containment Procedures</Form.Label>
                                <Form.Control placeholder="Containment procedures for your SCP" name="containmentProcedures" value={containmentProcedures} onChange={(e) => { this.onChangeHanlder(e) }} />
                            </Form.Group>
                            <Form.Group>
                                <input type="file" name="image" onChange={(e) => { this.onChangeHanlder(e) }} />
                            </Form.Group>
                            <Button onClick={(e) => { this.onSubmitHandler(e) }} href="/login">Submit</Button>
                        </Form>
                    </Col>

                </Row>
            </div >
        )
    }
}

export default NewScp