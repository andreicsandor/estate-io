import { 
  React, 
  useEffect,
  useState 
} from 'react';
import { 
  useNavigate, 
  useParams 
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Row, 
  Col, 
  Card, 
  CardImg, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from 'reactstrap';
import { 
  checkAuthenticated 
} from "../Authentication";


function CommercialBuy() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  // Check user authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const status = await checkAuthenticated();
      setIsAuthenticated(status);
    };
  
    checkAuth();
  }, []);

  const handleClick = (id) => {
    if (isAuthenticated === true) {
      navigate(`/property/${id}`);
    } else {
      toggleModal();
    }
  };

  const entries = [
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
        {entries.map(entry => (
          <Col sm={6} key={entries.id}>
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
                  <li>{entry.offices} Offices</li>
                  <li>{entry.bathrooms} Bathrooms</li>
                  <li>{entry.area} Area</li>
                </ul>
                <Button color='light' block onClick={() => handleClick(entry.id)}>View Details</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
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

function CommercialRent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check user authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const status = await checkAuthenticated();
      setIsAuthenticated(status);
    };
  
    checkAuth();
  }, []);

  const handleClick = (id) => {
    if (isAuthenticated === true) {
      navigate(`/property/${id}`);
    }
  };

  const entries = [
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
                  <li>{entry.offices} Offices</li>
                  <li>{entry.bathrooms} Bathrooms</li>
                  <li>{entry.area} Area</li>
                </ul>
                <Button color='light' block onClick={() => handleClick(entry.id)}>View Details</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </>
  );
}

function CommercialProperty() {
  const { id } = useParams();
  const propertyId = parseInt(id);

  const entry = {
    id: 1,
    name: 'Modern Office Building in Downtown',
    image: '/assets/images/gray.jpg',
    price: '$10,500,000',
    location: 'Downtown',
    offices: 25,
    bathrooms: 5,
    area: '10,000 sqft'
  };

  return (
    <>
    <div style={{margin: '100px'}}></div>
    <div className="m-5">
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <Card className='card-shadow-custom'>
            <CardImg className='card-custom'
              top src={entry.image}
              alt={entry.name}
              width="100%"
            />
            <CardBody>
              <CardTitle tag='h5' className='mb-2'>{entry.name}</CardTitle>
              <CardSubtitle className='mb-3'>{entry.location} - {entry.price}</CardSubtitle>
              <div className="d-flex justify-content-between">
                <ul className='list-unstyled'>
                  <li>{entry.offices} Offices</li>
                  <li>{entry.bathrooms} Bathrooms</li>
                  <li>{entry.area} Area</li>
                </ul>
                <Button color="light">Schedule Visit</Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
    </>
  );
}

export { CommercialBuy, CommercialRent, CommercialProperty };
