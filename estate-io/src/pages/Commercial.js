import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';


function CommercialBuy() {
  const images = [
    {
      id: 1,
      name: 'Modern Office Building in Downtown',
      image: '/assets/images/gray.jpg',
      price: '$10,500,000',
      location: 'Downtown',
      offices: 25,
      bathrooms: 5,
      area: '10,000 sqft'
    }
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
        {images.map(property => (
          <Col sm={6} key={images.id}>
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
                  <li>{property.offices} Offices</li>
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


function CommercialRent() {
  const images = [
    {
      id: 1,
      name: 'Modern Office Building in Downtown',
      image: '/assets/images/gray.jpg',
      price: '$10,500,000',
      location: 'Downtown',
      offices: 25,
      bathrooms: 5,
      area: '10,000 sqft'
    }
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
      <Row sm={6}>
        {images.map(property => (
          <Col sm={4} key={images.id}>
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
                  <li>{property.offices} Offices</li>
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

export { CommercialBuy, CommercialRent };
