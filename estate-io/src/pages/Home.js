import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  Col,
  Row,
  UncontrolledCarousel
} from 'reactstrap';

function Home(args) {
  const articles = [
    {
      id: 1,
      title: 'Home Prices Continue to Rise in Q1 2023',
      body: 'According to the latest data from the National Association of Realtors, median home prices rose by 7% in the first quarter of 2023, driven by low inventory and high demand.',
      date: 'Last updated 3 mins ago'
    },
    {
      id: 2,
      title: 'Rental Rates Soar Amid Housing Shortage',
      body: 'As home prices continue to rise, rental rates are also increasing in many cities across the country, with some areas seeing double-digit growth.',
      date: 'Last updated 3 mins ago'
    },
    {
      id: 3,
      title: 'The Future of Real Estate: Virtual Tours and Remote Work',
      body: 'As remote work becomes more common, real estate agents are turning to virtual tours and digital marketing to reach buyers and sellers.',
      date: 'Last updated 3 mins ago'
    },
    {
      id: 4,
      title: 'New York City Real Estate Market Bounces Back After Pandemic Slump',
      body: 'After a slowdown in 2020, the New York City real estate market is showing signs of recovery, with high-end properties selling for record prices.',
      date: 'Last updated 3 mins ago'
    },
    {
      id: 5,
      title: 'Millennials Drive Demand for Urban Living Spaces',
      body: 'With many millennials choosing to delay marriage and parenthood, they are driving demand for urban living spaces, with amenities like bike storage, rooftop decks, and shared workspaces.',
      date: 'Last updated 3 mins ago'
    }
  ];

  return (
    <>
    <div>
      <UncontrolledCarousel
        items={[
          {
            altText: 'Slide 2',
            header: 'A variety of options for every lifestyle',
            caption: 'from bustling urban centers to serene suburban neighborhoods.',
            key: 1,
            src: '/assets/images/skyline.jpg'
          },
          {
            altText: 'Slide 3',
            header: 'Looking for the ideal location to grow your business?',
            caption: 'Make your business dreams a reality in our prime locations.',
            key: 2,
            src: '/assets/images/office.jpg'
          },
          {
            altText: 'Slide 1',
            header: 'Ideal places to settle down with your family',
            caption: 'in welcoming cities & safe neighborhoods',
            key: 3,
            src: '/assets/images/sunset.jpg',
          }
        ]}
        // indicators={false} 
        // autoPlay={true} 
        // ride="carousel" 
        // pauseOnHover={false} 
        // interval={5000} 
        // style={{ height: '100%', maxHeight: '100vh' }} 
      />
    </div>
    <div className='mb-5 card-wrapper'>  
      <Row>
        <Col sm="4">
          <Card body className='card-custom'>
            <CardTitle tag="h5">Latest News</CardTitle>
            <div className='subcard-wrapper-custom' style={{ height: 401, overflowY: "scroll" }}>
              <Col sm="12">
                {articles.map((property => (
                  <Card body className='subcard-custom' key={property.id}>
                    <CardTitle tag="h6" className='fw-bold'>{property.title}</CardTitle>
                    <CardText>{property.body}</CardText>
                    <CardText><small className="text-muted">{property.date}</small></CardText>
                  </Card>
                )))}
              </Col>
            </div>
          </Card>
        </Col>
        <Col sm="4">
          <Card className='card-custom'>
            <CardBody>
              <CardTitle tag="h5">Popular Now</CardTitle>
              <CardText>Our top pick for this week includes a modern and sleek-looking house in the heart of Beverly Hills.</CardText>
              <Button color='light' block>View Details</Button>
            </CardBody>
            <CardImg
              alt="Card image cap"
              bottom
              src='/assets/images/lights.jpg'
              style={{
                height: 300
              }}
              width="100%"
            />
          </Card>
        </Col>
        <Col sm="4">
          <Card body className='card-custom'>
            <CardTitle tag="h5">Prices Trend</CardTitle>
            <div className='subcard-wrapper-custom' style={{ height: 401, overflowY: "scroll" }}>
            {/* Chart with prices trend */}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default Home;