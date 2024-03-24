import React from 'react';
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="me-auto">Weather Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Button as={Link} to="/signup" variant="outline-light">Sign Up</Button>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Header
