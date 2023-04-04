import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';


function ResidentialBuy() {
  const images = [
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
    <div className='mb-5 card-wrapper'>  
      <Row>
        {images.map(property => (
          <Col xl key={images.id}>
            <Card className='card-shadow-custom'>
              <CardImg className='card-custom'
                top src={property.image} 
                alt={property.name} 
                style={{height: 400}} 
                width="100%"
              />
              <CardBody>
                <CardTitle tag='h5' className='mb-2'>{property.name}</CardTitle>
                <CardSubtitle className='mb-3'>{property.location} - {property.price}</CardSubtitle>
                <ul className='list-unstyled'>
                  <li>{property.bedrooms} Bedrooms</li>
                  <li>{property.bathrooms} Bathrooms</li>
                  <li>{property.area} Area</li>
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

export default ResidentialBuy;
