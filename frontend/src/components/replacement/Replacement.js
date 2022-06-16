import React from 'react'
import axios from 'axios'
import {Row, Col, Form, Button, Nav} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import {Outlet} from 'react-router'
import { ServiceCentreList } from '../serviceCentreList/ServiceCentreList'

export const Replacement = () => {

  const [list, setList] = useState()

    

  const nearbyServiceCentreUrl = 'http://localhost:4000/nearby_service_centre'
  const formData = {lat: '', long: ''}
  const [data, setData] = useState(formData)

  // collect form data
    const handle = (e) => {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        // console.log(newData);
    }

  const submit = async (e) => {
    e.preventDefault();
    try{
        axios.post(nearbyServiceCentreUrl, {
            lat: data.lat,
            long: data.long,
        })
        .then(res => {
              console.log(res.data)
        })
    }catch(error){

    }
    // console.log(data);

    // clear form
    // e.target.reset()
  }

  useEffect(() => {
        axios.get('http://localhost:4000/service_centres_list')
        .then((response) => {
            setList(response.data)
            console.log(response.data);
        })
    }, [])

  
  return (
    <>
      <h2>Replacement</h2>
      <Row>
        <Col>
          <Form onSubmit={(e)=> submit(e)}>
            <Row>
                <div>
                    <h4>Enter your location:</h4>
                </div>
                <Col>
                    <Form.Group>
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control id='lat' type="double" onChange={(e) => handle(e)}/>
                </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control id='long' type="double" onChange={(e) => handle(e)}/>
                </Form.Group>
                </Col>
            </Row>           
            {/* <Form.Group>
                <Form.Label>Subject</Form.Label>
                <Form.Control id='subject' type="text" onChange={(e) => handle(e)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} id='message' onChange={(e) => handle(e)}/>
            </Form.Group> */}
            <div className='submit-button mt-2'>
                
                {/* <Nav>
                    <LinkContainer to='nearby_service_centres_list'>
                      <Nav.Link> */}
                        <Button variant="primary" type="submit">
                          Search
                        </Button>
                      {/* </Nav.Link>
                    </LinkContainer>     
                </Nav> */}
            </div>
          </Form>
        </Col>


        <Row className='mt-5'>
          {/* <Col><Outlet/></Col> */}
          {/* <ServiceCentreList/> */}
          <h3>Nearest Service Centres List</h3>
          <ul>{list}</ul>
        </Row>
      </Row>
      
    </>
  )
}
