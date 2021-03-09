import React, { useState } from "react";
import { Nav, Navbar, NavDropdown, Button, Row, Col } from "react-bootstrap";
import NavLogo from "./NavLogo.png";

function ScpNav() {
    const [activeDropdown, setActiveDropdown] = useState('');
    const showDropdown = (title) => {
        setActiveDropdown(title);
    };
    const hideDropdown = () => {
        setActiveDropdown('');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <Row>
                    <Col>
                        <img id="ScpNavImg" src={NavLogo} alt="SCP Logo" />
                    </Col>
                    <Col>
                        <h2>SCP Foundation</h2>
                        <h4>Secure. Contain. Protect.</h4>
                    </Col>
                </Row>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Row>
                        <Col>
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
                        <Col>
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
                        <Col>
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
                        <Col>
                            <Button className="ScpNavButton" href="/login">
                                Login
                            </Button>
                            <Button
                                className="ScpNavButton"
                                style={{ marginTop: "2.5px" }}
                                href="/signup"
                            >
                                Signup
                            </Button>
                        </Col>
                    </Row>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default ScpNav;
