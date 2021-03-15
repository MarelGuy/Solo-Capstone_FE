import React, { useState, useEffect } from "react";
import { Nav, Navbar, NavDropdown, Button, Row, Col, FormControl } from "react-bootstrap";
import NavLogo from "../assets/images/logos/NavLogo.png";
import axios from "axios"

function ScpNav() {
    const [activeDropdown, setActiveDropdown] = useState('');
    const showDropdown = (title) => {
        setActiveDropdown(title);
    };
    const hideDropdown = () => {
        setActiveDropdown('');
    };
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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
                setUser(res.data)
                setIsLoading(false)
            })
    }, [])


    return (
        <div>
            {isLoading === true
                ? <Navbar bg="light" expand="lg" >
                    <Navbar.Brand href="/">
                        <Row>
                            <Col sm={3}>
                                <img id="ScpNavImg" src={NavLogo} alt="SCP Logo" />
                            </Col>
                            <Col sm={9}>
                                <h2 className="ScpNavTitle" >SCP Foundation</h2>
                                <h4 className="ScpNavTitle" >Secure. Contain. Protect.</h4>
                            </Col>
                        </Row>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Row>
                            <Nav className="ml-5" id="ScpNavNav">
                                <Col sm>
                                    <NavDropdown
                                        title="SCP Series"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'SCP Series'}
                                        onMouseEnter={() => showDropdown('SCP Series')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>Series VI</NavDropdown.Item>
                                        <NavDropdown.Item>Series V</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series V Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series IV</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series IV Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series III</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series III Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series II</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series II Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series I</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series I Tales</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Tales"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Tales'}
                                        onMouseEnter={() => showDropdown('Tales')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>Fundation Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series Archive</NavDropdown.Item>
                                        <NavDropdown.Item>Incident Report</NavDropdown.Item>
                                        <NavDropdown.Item>CreepyPasta Archive</NavDropdown.Item>
                                    </NavDropdown>
                                </Col>
                                <Col sm>
                                    <NavDropdown
                                        title="Library"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Library'}
                                        onMouseEnter={() => showDropdown('Library')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>User-Curated Lists</NavDropdown.Item>
                                        <NavDropdown.Item>Joke SCPs</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Joke SCPS Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Explained SCPs</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Explained SCPs Tales</NavDropdown.Item>
                                        <NavDropdown.Item>GoI Formats</NavDropdown.Item>
                                        <NavDropdown.Item>Audio Adaptations</NavDropdown.Item>
                                        <NavDropdown.Item>SCP Artwork Hub</NavDropdown.Item>
                                        <NavDropdown.Item>Contest Archive</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Universe"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Universe'}
                                        onMouseEnter={() => showDropdown('Universe')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>Canons</NavDropdown.Item>
                                        <NavDropdown.Item>Groups of Intrest</NavDropdown.Item>
                                        <NavDropdown.Item>Anomalous Items</NavDropdown.Item>
                                        <NavDropdown.Item>Extranormal Events</NavDropdown.Item>
                                        <NavDropdown.Item>Unexplained Locations</NavDropdown.Item>
                                    </NavDropdown>
                                </Col>
                                <Col sm>
                                    <NavDropdown
                                        title="Background"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Background'}
                                        onMouseEnter={() => showDropdown('Background')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>About the Fundation</NavDropdown.Item>
                                        <NavDropdown.Item>Object Classes</NavDropdown.Item>
                                        <NavDropdown.Item>Personnel</NavDropdown.Item>
                                        <NavDropdown.Item>Security & Clearance</NavDropdown.Item>
                                        <NavDropdown.Item>Secure Facilites</NavDropdown.Item>
                                        <NavDropdown.Item>Task Forces</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Info Pages"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Info Pages'}
                                        onMouseEnter={() => showDropdown('Info Pages')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>Guide Hub</NavDropdown.Item>
                                        <NavDropdown.Item>User Tools</NavDropdown.Item>
                                        <NavDropdown.Item>Tag Search</NavDropdown.Item>
                                        <NavDropdown.Item>Meet The Staff</NavDropdown.Item>
                                        <NavDropdown.Item>Criticism Policy</NavDropdown.Item>
                                        <NavDropdown.Item>Licensing Guide</NavDropdown.Item>
                                        <NavDropdown.Item>Image Use Policy</NavDropdown.Item>
                                        <NavDropdown.Item>Chat Guidelines</NavDropdown.Item>
                                        <NavDropdown.Item>Deletions Guidelines</NavDropdown.Item>
                                        <NavDropdown.Item>Seminars and Workshops</NavDropdown.Item>
                                        <NavDropdown.Item>Donations Policy</NavDropdown.Item>
                                        <NavDropdown.Item>Info Pages</NavDropdown.Item>
                                    </NavDropdown>
                                </Col>
                                <Col sm>
                                    <FormControl type="text" id="ScpNavForm" placeholder="Search" className="mr-sm-2" />
                                    <Button style={{ marginTop: "2px" }} id="ScpNavButton" variant="outline-success">Search</Button>
                                </Col>
                                <div style={{ marginLeft: '40px' }}>
                                    <Col sm={4}>
                                        <Button className="ScpNavButton" href="/login">
                                            Login
                                     </Button>
                                        <Button
                                            className="ScpNavButton"
                                            style={{ marginTop: "2px" }}
                                            href="/signup"
                                        >
                                            Signup
                                    </Button>
                                    </Col>
                                </div>
                            </Nav>
                        </Row>
                    </Navbar.Collapse>
                </Navbar >
                : <Navbar bg="light" expand="lg" >
                    <Navbar.Brand href="/">
                        <Row>
                            <Col sm={4}>
                                <img id="ScpNavImg" src={NavLogo} alt="SCP Logo" />
                            </Col>
                            <Col sm={8}>
                                <h2 className="ScpNavTitle" >SCP Foundation</h2>
                                <h4 className="ScpNavTitle" >Secure. Contain. Protect.</h4>
                            </Col>
                        </Row>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Row style={{ marginLeft: "90px", margintop: "10px" }}>
                            <Nav className="ml-5" id="ScpNavNav">
                                <Col sm>
                                    <NavDropdown
                                        title="SCP Series"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'SCP Series'}
                                        onMouseEnter={() => showDropdown('SCP Series')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>Series VI</NavDropdown.Item>
                                        <NavDropdown.Item>Series V</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series V Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series IV</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series IV Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series III</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series III Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series II</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series II Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series I</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Series I Tales</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Tales"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Tales'}
                                        onMouseEnter={() => showDropdown('Tales')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>Fundation Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Series Archive</NavDropdown.Item>
                                        <NavDropdown.Item>Incident Report</NavDropdown.Item>
                                        <NavDropdown.Item>CreepyPasta Archive</NavDropdown.Item>
                                    </NavDropdown>
                                </Col>
                                <Col sm>
                                    <NavDropdown
                                        title="Library"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Library'}
                                        onMouseEnter={() => showDropdown('Library')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>User-Curated Lists</NavDropdown.Item>
                                        <NavDropdown.Item>Joke SCPs</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Joke SCPS Tales</NavDropdown.Item>
                                        <NavDropdown.Item>Explained SCPs</NavDropdown.Item>
                                        <NavDropdown.Item>&gt;Explained SCPs Tales</NavDropdown.Item>
                                        <NavDropdown.Item>GoI Formats</NavDropdown.Item>
                                        <NavDropdown.Item>Audio Adaptations</NavDropdown.Item>
                                        <NavDropdown.Item>SCP Artwork Hub</NavDropdown.Item>
                                        <NavDropdown.Item>Contest Archive</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Universe"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Universe'}
                                        onMouseEnter={() => showDropdown('Universe')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>Canons</NavDropdown.Item>
                                        <NavDropdown.Item>Groups of Intrest</NavDropdown.Item>
                                        <NavDropdown.Item>Anomalous Items</NavDropdown.Item>
                                        <NavDropdown.Item>Extranormal Events</NavDropdown.Item>
                                        <NavDropdown.Item>Unexplained Locations</NavDropdown.Item>
                                    </NavDropdown>
                                </Col>
                                <Col sm>
                                    <NavDropdown
                                        title="Background"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Background'}
                                        onMouseEnter={() => showDropdown('Background')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>About the Fundation</NavDropdown.Item>
                                        <NavDropdown.Item>Object Classes</NavDropdown.Item>
                                        <NavDropdown.Item>Personnel</NavDropdown.Item>
                                        <NavDropdown.Item>Security & Clearance</NavDropdown.Item>
                                        <NavDropdown.Item>Secure Facilites</NavDropdown.Item>
                                        <NavDropdown.Item>Task Forces</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Info Pages"
                                        id="basic-nav-dropdown"
                                        show={activeDropdown === 'Info Pages'}
                                        onMouseEnter={() => showDropdown('Info Pages')}
                                        onMouseLeave={hideDropdown}>
                                        <NavDropdown.Item>Guide Hub</NavDropdown.Item>
                                        <NavDropdown.Item>User Tools</NavDropdown.Item>
                                        <NavDropdown.Item>Tag Search</NavDropdown.Item>
                                        <NavDropdown.Item>Meet The Staff</NavDropdown.Item>
                                        <NavDropdown.Item>Criticism Policy</NavDropdown.Item>
                                        <NavDropdown.Item>Licensing Guide</NavDropdown.Item>
                                        <NavDropdown.Item>Image Use Policy</NavDropdown.Item>
                                        <NavDropdown.Item>Chat Guidelines</NavDropdown.Item>
                                        <NavDropdown.Item>Deletions Guidelines</NavDropdown.Item>
                                        <NavDropdown.Item>Seminars and Workshops</NavDropdown.Item>
                                        <NavDropdown.Item>Donations Policy</NavDropdown.Item>
                                        <NavDropdown.Item>Info Pages</NavDropdown.Item>
                                    </NavDropdown>
                                </Col>
                                <Col sm>
                                    <FormControl type="text" id="ScpNavForm" placeholder="Search" className="mr-sm-2" />
                                    <Button id="ScpNavButton" variant="outline-success" style={{ marginTop: "2.5px" }}>Search</Button>
                                </Col>
                                <div style={{ marginLeft: '55px' }}>
                                    <Col sm={4} >
                                        <a href="/me"><img src={user.avatar} alt="lol" style={{ width: "100%", borderRadius: "15px" }} /></a>
                                    </Col >
                                    <Col sm>
                                        <p style={{ marginTop: "2.5px" }}>Profile</p>
                                    </Col>
                                </div >
                            </Nav>
                        </Row>
                    </Navbar.Collapse>
                </Navbar >}

        </div>
    );
}




/*

*/

export default ScpNav;
