import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardTitle, 
  CardText 
} from 'reactstrap';


function About() {
  return (
    <>
    <div style={{margin: '100px'}}></div>
    <Container className='my-5'>
      <Row>
        <Col>
          <h1 className='display-5 text-center mb-5'>About Us</h1>
        </Col>
      </Row>
      <Row className='justify-content-center text-center mb-4'>
        <Col md={{size: 8}}>
          <p className='lead'>We are a real estate company dedicated to helping our clients find their dream home. Our team of experienced agents has a deep understanding of the local market and is committed to providing personalized service to each and every client.</p>
        </Col>
      </Row>
      <Row className='my-5'>
        <Col md={{size: 4}}>
          <Card className='card-custom'>
            <CardBody>
              <CardTitle tag='h4' className='mb-4'>Our Mission</CardTitle>
              <CardText className='lead'>We believe that buying or selling a home should be a stress-free and enjoyable experience. Our mission is to provide our clients with the support and resources they need to make informed decisions and achieve their real estate goals on the short and long term.</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={{size: 4}}>
          <Card className='card-custom'>
            <CardBody>
              <CardTitle tag='h4' className='mb-4'>Our Team</CardTitle>
              <CardText className='lead'>Our team of agents is made up of experienced professionals who are passionate about real estate. We work tirelessly to ensure that our clients have a positive and successful experience, and are always available to answer questions and provide guidance.</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md={{size: 4}}>
          <Card className='card-custom'>
            <CardBody>
              <CardTitle tag='h4' className='mb-4'>Our Services</CardTitle>
              <CardText className='lead'>We offer a range of services to meet the needs of our clients, including buyer representation, seller representation, and property management. Our goal is to provide comprehensive support throughout the entire real estate process, from start to finish.</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className='text-center lead'>Contact us today to learn more about how we can help you achieve your real estate goals.</p>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default About;
