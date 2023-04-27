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
  import 'react-datepicker/dist/react-datepicker.css';
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
    ModalFooter,
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
  
      const [modal, setModal] = useState(false);
      const [appointments, setAppointments] = useState([]);
      const toggleModal = () => setModal(!modal);
  
      const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
      const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  
      const [confirmationModal, setConfirmationModal] = useState(false);
      const toggleConfirmationModal = () => setConfirmationModal(!confirmationModal);
  
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
  
      // Get the type of property
      const getPropertyType = (property) => {
        let propertyType;
      
        if ('bedrooms' in property) {
          propertyType = 'residential';
        } else {
          propertyType = 'unknown';
        }
      
        return propertyType;
      };
    
      // Fetch the selected entry
      useEffect(() => {
        if (properties.length > 0) {
          const selectedProperty = properties.find((prop) => prop.id === propertyId);
          setProperty(selectedProperty);
        }
      }, [properties, propertyId]);
  
      // Fetch appointments
      useEffect(() => {
        if (property) {
          const fetchAppointments = async () => {
            try {
              const response = await api.get(`/api/appointments/?property=${propertyId}`);
              setAppointments(response.data);
            } catch (error) {
              console.error("An error occurred while fetching appointments:", error);
            }
          };
          fetchAppointments();
        }
      }, [property, propertyId]);    
  
      const generateTimeSlots = () => {
        const timeSlots = [];
        for (let hour = 8; hour < 18; hour++) {
          for (let min = 0; min <= 30; min += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
            timeSlots.push(time);
          }
        }
        return timeSlots;
      };    
  
      const saveAppointment = async () => {
        try {
          const time = new Date(`${selectedDate}T${selectedTimeSlot}:00`);
      
          const appointmentType = getPropertyType(property); 
      
          const newAppointment = {
            appointment_datetime: time.toISOString(),
            property_id: propertyId,
            appointment_type: appointmentType, 
          };
      
          await api.post('/api/new-appointment/', newAppointment);
          toggleConfirmationModal();
          toggleModal(); // Close the appointments modal
        } catch (error) {
          console.error('An error occurred while saving the appointment:', error);
        }
      };
         
      const AppointmentsModal = () => {
        const timeSlots = generateTimeSlots();
      
        const appointmentsForSelectedDate = appointments.filter((appointment) => {
          const appointmentDate = new Date(appointment.time).toISOString().split('T')[0];
          return appointmentDate === selectedDate;
        });
      
        const appointmentTimes = appointmentsForSelectedDate.map((appointment) =>
          new Date(appointment.time).toISOString().split('T')[1].substring(0, 5)
        );
      
        const availableTimeSlots = timeSlots.filter(
          (timeSlot) => !appointmentTimes.includes(timeSlot)
        );
  
        const handleTimeSlotClick = (timeSlot) => {
          setSelectedTimeSlot(timeSlot);
          toggleConfirmationModal();
        };
      
        return (
          <>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Schedule Visit</ModalHeader>
            <ModalBody>
              <h5>Select Date:</h5>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  backgroundColor: 'white',
                  padding: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ced4da',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                }}
              />
              <h5 className="mt-3">Available time slots:</h5>
              {availableTimeSlots.map((timeSlot, index) => (
                <Button
                  key={index}
                  className="m-1"
                  color="dark"
                  onClick={() => handleTimeSlotClick(timeSlot)}
                >
                  {timeSlot}
                </Button>
              ))}
            </ModalBody>
          </Modal>
  
          <Modal isOpen={confirmationModal} toggle={toggleConfirmationModal} centered>
          <ModalHeader toggle={toggleConfirmationModal}>Confirm Appointment</ModalHeader>
          <ModalBody>
            Confirm appointment for {selectedDate} at {selectedTimeSlot}?
          </ModalBody>
          <ModalFooter>
            <Button color="dark" onClick={saveAppointment}>
              Confirm
            </Button>
            <Button color="light" onClick={toggleConfirmationModal}>
              Cancel
            </Button>
          </ModalFooter>
          </Modal>
          </>
        );
      };
      
  
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
                      <Button color="dark" onClick={toggleModal}>
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
  
          <AppointmentsModal />
  
        </>
      );
  }
  
  export default Property;