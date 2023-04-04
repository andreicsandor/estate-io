import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { 
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Row,
} from 'reactstrap';

function News(args) {
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
    <div style={{margin: '100px'}}></div>
    <div className='news-wrapper'>
      <Row>
        <Col sm="4">
          <Link to="/news/1" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='subcard-custom'>
              <CardBody>
                <CardTitle tag="h5" className='mb-4'>Home Prices Continue to Rise in Q1 2023</CardTitle>
                <CardText className='lead'>According to the latest data from the National Association of Realtors, median home prices rose by 7% in the first quarter of 2023, driven by low inventory and high demand.</CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          </Link>
          <Link to="/news/1" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='subcard-custom'>
              <CardBody>
                <CardTitle tag="h5" className='mb-4'>Rental Rates Soar Amid Housing Shortage</CardTitle>
                <CardText className='lead'>As home prices continue to rise, rental rates are also increasing in many cities across the country, with some areas seeing double-digit growth.</CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          </Link>
          <Link to="/news/1" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='subcard-custom'>
              <CardBody>
                <CardTitle tag="h5" className='mb-4'>The Future of Real Estate: Virtual Tours and Remote Work</CardTitle>
                <CardText className='lead'>As remote work becomes more common, real estate agents are turning to virtual tours and digital marketing to reach buyers and sellers.</CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          </Link>

        </Col>
        <Col sm="4">
        <Link to="/news/1" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='subcard-custom'>
              <CardBody>
                <CardTitle tag="h5" className='mb-4'>New York City Real Estate Market Bounces Back After Pandemic Slump</CardTitle>
                <CardText className='lead'>After a slowdown in 2020, the New York City real estate market is showing signs of recovery, with high-end properties selling for record prices.</CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          </Link>
          <Link to="/news/1" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='subcard-custom'>
              <CardBody>
                <CardTitle tag="h5" className='mb-4'>Millennials Drive Demand for Urban Living Spaces</CardTitle>
                <CardText className='lead'>With many millennials choosing to delay marriage and parenthood, they are driving demand for urban living spaces, with amenities like bike storage, rooftop decks, and shared workspaces.</CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          </Link>
          <Link to="/news/1" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='subcard-custom'>
              <CardBody>
                <CardTitle tag="h5" className='mb-4'>Real Estate Agents Adopt New Technologies to Stay Competitive</CardTitle>
                <CardText className='lead'>As the real estate industry becomes more competitive, many agents are adopting new technologies like virtual reality and artificial intelligence to better serve their clients.</CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          </Link>
        </Col>
        <Col sm="4">
        <Link to="/news/1" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='subcard-custom'>
              <CardBody>
                <CardTitle tag="h5" className='mb-4'>Rising Interest Rates Pose Challenges for First-Time Homebuyers</CardTitle>
                <CardText className='lead'>As interest rates continue to rise, first-time homebuyers are facing challenges in securing affordable financing, leading to increased competition for lower-priced homes.</CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          </Link>
          <Link to="/news/1" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='subcard-custom'>
              <CardBody>
                <CardTitle tag="h5" className='mb-4'>Foreign Buyers Boost Demand for U.S. Real Estate</CardTitle>
                <CardText className='lead'>With a strong U.S. economy and political stability, foreign buyers are investing heavily in U.S. real estate, particularly in popular cities like New York, Miami, and Los Angeles.</CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          </Link>
          <Link to="/news/1" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='subcard-custom'>
              <CardBody>
                <CardTitle tag="h5" className='mb-4'>New Construction Booms in Many Cities Despite Labor Shortages</CardTitle>
                <CardText className='lead'>Despite a shortage of skilled labor, new construction is booming in many cities across the country, as developers rush to meet demand for new housing.</CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default News;