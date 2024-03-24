import React from 'react';
import { Col, Row, Navbar } from 'react-bootstrap';

function Footer() {
    return (
        <footer style={{ marginTop: 'auto' }}>
            <Navbar bg="dark" variant="dark" expand="lg" style={{ width: 'auto' }}>

                <Row className="w-100 justify-content-center"> {/* Add justify-content-center class to center the content */}
                    <Col className="text-center">
                        <p style={{ color: 'white' }}>© {new Date().getFullYear()} Weather Dashboard App. All rights reserved.</p>
                    </Col>
                </Row>

            </Navbar>
        </footer>
    );
}

export default Footer;
