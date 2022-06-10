import React from 'react'
import {Container, Row, Col, Nav,} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Outlet} from 'react-router'

export const Services = () => {
  return (
    <>
        <Container>
            <Row>
                <Col>
                    <h3>Choose a Service</h3>
                    <Row>
                        <Nav>
                            <LinkContainer to='replacement'>
                                <Nav.Link>Replace Car</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Row>
                    <Row>
                        <Nav>
                            <LinkContainer to='/services/leave'>
                                <Nav.Link>Leave Car</Nav.Link>
                            </LinkContainer>     
                        </Nav>
                    </Row>
                </Col>
                <Col><Outlet/></Col>
            </Row>
        </Container>
    </>
  )
}
