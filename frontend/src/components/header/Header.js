import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Container, Nav} from 'react-bootstrap'

export const Header = () => {
  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Car Rental Service</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/">
                       <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/services">
                       <Nav.Link>Services</Nav.Link>
                    </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}
