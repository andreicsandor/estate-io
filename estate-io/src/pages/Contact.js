import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Container, 
  Row, 
  Col, 
  Form, 
  Input, 
  Button 
} from 'reactstrap';


function Contact() {
  return (
    <>
    <div style={{margin: '100px'}}></div>
    <Container className='my-5'>
      <Row>
        <Col>
          <h1 className='display-5 text-center mb-5'>Contact Us</h1>
        </Col>
      </Row>
      <Row className='justify-content-center mb-4'>
        <Col md={{size: 8}}>
          <p className='lead text-center'>We're always here to help. If you have any questions or comments, please fill out the form below and we'll get back to you as soon as possible.</p>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={{size: 4}}>
          <Form>
            <Input placeholder="Name" bsSize="default" className='mb-3'/>
            <Input placeholder="E-mail" bsSize="default" className='mb-3'/>
            <Input placeholder="Phone" bsSize="default" className='mb-3'/>
            <Input type='textarea' name='message' id='message' rows={6} placeholder='Enter your message' className='form-control mb-5' />
            <Button color='dark' block>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Contact;
