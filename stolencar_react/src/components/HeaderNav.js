import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'

class HeaderNav extends Component {
    render() {
        return (
            <div>
                <Navbar fixed="top" bg="primary" variant="dark" expand="lg">
                    <Navbar.Brand href="/">Stolen Car</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/User">User</Nav.Link>
                            <Nav.Link href="/Cop">Cop</Nav.Link>
                            <Nav.Link href="/addcop">Add & View Cop</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default HeaderNav;