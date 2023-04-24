import { 
  React, 
  useState, 
  useEffect 
} from 'react';
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
import api from '../Api';


function Home(args) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await api.get('/api/headlines/')
        setArticles(response.data);
      } catch (error) {
        console.error('An error occurred while fetching headlines:', error);
      }
    };

    fetchHeadlines();
  }, []);

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
      />
    </div>
    <div className='mb-5 card-wrapper'>  
      <Row>
        <Col sm="6">
          <Card body className='card-custom'>
            <CardTitle tag="h5">Latest News</CardTitle>
            <div className='subcard-wrapper-custom' style={{ height: 600, overflowY: "scroll" }}>
              <Col sm="12">
                {articles.map((article => (
                  <Card body className='subcard-custom' key={article.id}>
                    <CardTitle tag="h6" className='fw-bold'>{article.title}</CardTitle>
                    <CardText>{article.body}</CardText>
                    <CardText><small className="text-muted">{new Date(article.created).toLocaleString()}</small></CardText>
                  </Card>
                )))}
              </Col>
            </div>
          </Card>
        </Col>
        <Col sm="6">
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
              width="100%"
            />
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default Home;