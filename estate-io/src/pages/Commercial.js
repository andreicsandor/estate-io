import { 
  React, 
  useEffect,
  useState 
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
import api from '../publicApi';


function CommercialBuy() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [properties, setProperties] = useState([]);

  // Check user authentication status and fetch entries when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const status = await checkAuthenticated();
      setIsAuthenticated(status);
    };

    const fetchProperties = async () => {
      try {
        const response = await api.get('/api/commercial-properties-sale/')
        setProperties(response.data);
      } catch (error) {
        console.error('An error occurred while fetching properties:', error);
      }
    };
  
    checkAuth();
    fetchProperties();
  }, []);

  const handleClick = (id) => {
    if (isAuthenticated === true) {
      navigate(`/property/${id}`);
    } else {
      toggleModal();
    }
  };

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
        {properties.map(property => (
          <Col sm={6} key={property.id}>
            <Card className='card-shadow-custom'>
              <CardImg className='card-custom'
                top src={`http://127.0.0.1:8000${property.image}`} 
                alt={property.name} 
                width="100%"
              />
              <CardBody>
                <CardTitle tag='h5' className='mb-2'>{property.name}</CardTitle>
                <CardSubtitle className='mb-3'>{property.location} - ${property.price}</CardSubtitle>
                <ul className='list-unstyled'>
                  <li>{property.offices} Offices</li>
                  <li>{property.bathrooms} Bathrooms</li>
                  <li>{property.area} sqm Area</li>
                </ul>
                <Button color='light' block onClick={() => handleClick(property.id)}>View Details</Button>
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
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [properties, setProperties] = useState([]);

  // Check user authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const status = await checkAuthenticated();
      setIsAuthenticated(status);
    };

    const fetchProperties = async () => {
      try {
        const response = await api.get('/api/commercial-properties-rent/')
        setProperties(response.data);
      } catch (error) {
        console.error('An error occurred while fetching properties:', error);
      }
    };
  
    checkAuth();
    fetchProperties();
  }, []);

  const handleClick = (id) => {
    if (isAuthenticated === true) {
      navigate(`/property/${id}`);
    } else {
      toggleModal();
    }
  };

  return (
    <>
    <div style={{margin: '100px'}}></div>
    <Row>
      <Col>
        <h1 className='display-5 text-center'>Available Rentals</h1>
      </Col>
    </Row>
    <div className='m-5'>  
      <Row sm={6}>
        {properties.map(property => (
          <Col sm={4} key={properties.id}>
            <Card className='card-shadow-custom'>
              <CardImg className='card-custom'
                top src={`http://127.0.0.1:8000${property.image}`} 
                alt={property.name} 
                width="100%"
              />
              <CardBody>
                <CardTitle tag='h5' className='mb-2'>{property.name}</CardTitle>
                <CardSubtitle className='mb-3'>{property.location} - ${property.price}</CardSubtitle>
                <ul className='list-unstyled'>
                  <li>{property.offices} Offices</li>
                  <li>{property.bathrooms} Bathrooms</li>
                  <li>{property.area} sqm Area</li>
                </ul>
                <Button color='light' block onClick={() => handleClick(property.id)}>View Details</Button>
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

export { CommercialBuy, CommercialRent };
