import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';


function ResidentialBuy() {
  const entries = [
    {
      id: 1,
      name: 'Luxury Condo in Downtown',
      image: '/assets/images/pool.jpg',
      price: '$2,500,000',
      location: 'Downtown',
      bedrooms: 3,
      bathrooms: 2,
      area: '2,000 sqft'
    },
    {
      id: 2,
      name: 'Spacious Family Home',
      image: '/assets/images/wood.jpg',
      price: '$1,200,000',
      location: 'Suburbia',
      bedrooms: 4,
      bathrooms: 3,
      area: '3,000 sqft'
    },
    {
      id: 3,
      name: 'Oceanfront Villa',
      image: '/assets/images/lake.jpg',
      price: '$4,500,000',
      location: 'Lakeside',
      bedrooms: 5,
      bathrooms: 4,
      area: '4,500 sqft'
    },
  ];

  return (
    <>
    <div style={{margin: '100px'}}></div>
    <Row>
      <Col>
        <h1 className='display-5 text-center'>Available Properties</h1>
      </Col>
    </Row>
    <div className='m-5'>  
      <Row sm={12}>
        {entries.map(entry => (
          <Col sm={4} key={entries.id}>
            <Card className='card-shadow-custom'>
              <CardImg className='card-custom'
                top src={entry.image} 
                alt={entry.name} 
                width="100%"
              />
              <CardBody>
                <CardTitle tag='h5' className='mb-2'>{entry.name}</CardTitle>
                <CardSubtitle className='mb-3'>{entry.location} - {entry.price}</CardSubtitle>
                <ul className='list-unstyled'>
                  <li>{entry.bedrooms} Bedrooms</li>
                  <li>{entry.bathrooms} Bathrooms</li>
                  <li>{entry.area} Area</li>
                </ul>
                <Button color='light' block>View Details</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </>
  );
}


function ResidentialRent() {
  const entries = [
    
  ];

  return (
    <>
    <div style={{margin: '100px'}}></div>
    <Row>
      <Col>
        <h1 className='display-5 text-center'>Available Properties</h1>
      </Col>
    </Row>
    <div className='m-5'>  
      <Row sm={12}>
        {entries.map(entry => (
          <Col sm={4} key={entries.id}>
            <Card className='card-shadow-custom'>
              <CardImg className='card-custom'
                top src={entry.image} 
                alt={entry.name} 
                style={{height: 400}} 
                width="100%"
              />
              <CardBody>
                <CardTitle tag='h5' className='mb-2'>{entry.name}</CardTitle>
                <CardSubtitle className='mb-3'>{entry.location} - {entry.price}</CardSubtitle>
                <ul className='list-unstyled'>
                  <li>{entry.bedrooms} Bedrooms</li>
                  <li>{entry.bathrooms} Bathrooms</li>
                  <li>{entry.area} Area</li>
                </ul>
                <Button color='light' block>View Details</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </>
  );
}


export { ResidentialBuy, ResidentialRent }; 
