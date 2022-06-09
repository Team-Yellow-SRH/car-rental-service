import React from 'react'
import {Container, Row, Col, Nav} from 'react-bootstrap'
import { Replacement } from '../../components/replacement/Replacement'
import {LinkContainer} from 'react-router-bootstrap'


export const Services = () => {
  return (
    <>
        <Container>
            <Row>
                <Col>Choose a Service</Col>
                <Row>
                    <Nav>
                        <LinkContainer to={<Replacement/>}>
                            <Nav.Link>Replace Car</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    
                </Row>
                <Col><Replacement/></Col>
            </Row>
        </Container>
    </>
  )
}
