import { 
  React, 
  useState, 
  useEffect 
} from 'react';
import { 
  useNavigate, 
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Row, 
  Col, 
  Card, 
  CardImg, 
  CardBody, 
  CardTitle, 
  CardText,
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  UncontrolledCarousel
} from 'reactstrap';
import { 
  checkAuthenticated 
} from "../Authentication";
import api from '../publicApi';


function Home(args) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [articles, setArticles] = useState([]);
  const [spotlight, setSpotlight] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const status = await checkAuthenticated();
      setIsAuthenticated(status);
    };

    const fetchHeadlines = async () => {
      try {
        const response = await api.get('/api/headlines/')
        setArticles(response.data);
      } catch (error) {
        console.error('An error occurred while fetching headlines:', error);
      }
    };

    const fetchSpotlight = async () => {
      try {
        const response = await api.get('/api/residential-spotlight/')
        setSpotlight(response.data);
      } catch (error) {
        console.error('An error occurred while fetching spotlight:', error);
      }
    };

    checkAuth();
    fetchHeadlines();
    fetchSpotlight();
  }, []);

  const handleClick = (id) => {
    if (isAuthenticated === true) {
      navigate(`/residential-property/${id}`);
    } else {
      toggleModal();
    }
  };

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
            <div className='subcard-wrapper-custom' style={{ height: 550, overflowY: "scroll" }}>
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
          {spotlight.map((spotlight => (
            <>
            <CardBody>
              <CardTitle tag="h5">Popular Now</CardTitle>
              <CardText>Our top pick for this week includes {spotlight.name}.</CardText>
              <Button color='light' block onClick={() => handleClick(spotlight.id)}>View Details</Button>
            </CardBody>
            <CardImg
              top src={`http://127.0.0.1:8000${spotlight.image}`} 
              bottom
              alt={spotlight.name} 
              width="100%"
            />
            </>
          )))}
          </Card>
        </Col>
      </Row>
    </div>

    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Login Required</ModalHeader>
      <ModalBody>
        You need to be logged in to access this page.
      </ModalBody>
      <ModalFooter>
        <Button color="dark" onClick={toggleModal}>OK</Button>
      </ModalFooter>
    </Modal>

    </>
  );
}

export default Home;