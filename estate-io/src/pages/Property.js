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
} from 'reactstrap';
import { 
  checkAuthenticated 
} from "../Authentication";
import api from '../privateApi';


function Property() {
    const { id } = useParams();
    const propertyId = parseInt(id);
    const [properties, setProperties] = useState([]);
    const [property, setProperty] = useState(null);
    const navigate = useNavigate();
  
    // Check user authentication status and fetch entries when the component mounts
    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await checkAuthenticated();
            if (!isAuthenticated) {
              navigate('/');
            }
          };

        const fetchProperties = async () => {
          try {
            const rentResponse = api.get("/api/residential-properties-rent/");
            const saleResponse = api.get("/api/residential-properties-sale/");
      
            const [rentData, saleData] = await Promise.all([rentResponse, saleResponse]);
      
            setProperties([...rentData.data, ...saleData.data]);
          } catch (error) {
            console.error("An error occurred while fetching properties:", error);
          }
        };
      
        checkAuth();
        fetchProperties();
    }, []);
  
    // Fetch the selected entry
    useEffect(() => {
      if (properties.length > 0) {
        const selectedProperty = properties.find((prop) => prop.id === propertyId);
        setProperty(selectedProperty);
      }
    }, [properties, propertyId]);

    
    if (!property) {
      return (
        <>
          <div style={{ margin: '100px' }}></div>
          <div className="centered-bold-text">Loading property...</div>
        </>
      );
    }

    return (
      <>
        <div style={{ margin: '100px' }}></div>
        <div className="m-5">
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <Card className="card-shadow-custom">
                <CardImg
                  className="card-custom"
                  top src={`http://127.0.0.1:8000${property.image}`} 
                  alt={property.name}
                  width="100%"
                />
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <CardTitle tag="h5" className="mb-2">
                      {property.name}
                    </CardTitle>
                    <Button color="dark">
                      Schedule Visit
                    </Button>
                  </div>
                  <CardSubtitle className="mb-3">
                    {property.location} - ${property.price}
                  </CardSubtitle>
                  <ul className="list-unstyled">
                    <li>{property.offices}{property.bedrooms} Rooms</li>
                    <li>{property.bathrooms} Bathrooms</li>
                    <li>{property.area} sqm Area</li>
                  </ul>
                  <p>{property.description}</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}

export default Property;