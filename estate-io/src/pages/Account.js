import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import api from '../api';
import { refreshToken } from "../token";


// Functions to check user authentication status

const checkAuthenticated = async (navigate) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const response = await api.get("/api/check_authentication/");
      if (response.data.authenticated) {
        console.log("User is authenticated");
        navigate("/");
      } else {
        console.log("User is not authenticated");
        const refreshed = await refreshToken();
        if (refreshed) {
          checkAuthenticated(navigate);
        } else {
          navigate("/login");
        }
      }
    } else {
      console.log("No access token found");
    }
  } catch (error) {
    console.error('An unknown error occurred:', error);
  }
};


const checkAnonymous = async (navigate) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const response = await api.get("/api/check_authentication/");
      if (response.data.authenticated) {
        console.log("User is authenticated");
      } else {
        console.log("User is not authenticated");
        const refreshed = await refreshToken();
        if (!refreshed) {
          navigate("/login");
        }
      }
    } else {
      console.log("No access token found");
      navigate("/login");
    }
  } catch (error) {
    console.error('An unknown error occurred:', error);
    navigate("/login");
  }
};


// Function to get user location

function saveLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const locationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      localStorage.setItem('userLocation', JSON.stringify(locationData));
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  // Check user authentication status when the component mounts
  useEffect(() => {
    checkAuthenticated(navigate);
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/api/token/', {
        username: username,
        password: password,
      });
      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        navigate('/');
      } else {
        console.error('Log in failed.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        console.error('An unknown error occurred:', error);
        navigate("/login");
      }
    }

    // Call saveUserLocation after successful login
    saveLocation();
  };

  return (
    <>
    <div style={{margin: '100px'}}></div>
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="display-5 text-center mb-5">Login</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                bsSize="default" 
                className='mb-3'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                bsSize="default" 
                className='mb-5'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormGroup>

            <Button color="dark" block>Login</Button>

            {errorMessage && <div className="mt-5 mb-5 fw-bold error-message">{errorMessage}</div>}

          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  }, [navigate]);

  return (
    <div></div>
  );
};


const Signup = () => {
  const [username, setUsername] = useState('');
  const [firstName, setName] = useState('');
  const [lastName, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preference, setPreference] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Check user authentication status when the component mounts
  useEffect(() => {
    checkAuthenticated(navigate);
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/api/signup/', {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        preference: preference,
      });
      if (response.status === 201) {
        navigate('/');
      } else {
        console.error('Sign up failed.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };
  
  return (
    <>
    <div style={{margin: '100px'}}></div>
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="display-5 text-center mb-5">Sign up</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                bsSize="default" 
                className='mb-3'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="firstName"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                bsSize="default" 
                className='mb-3'
                value={firstName}
                onChange={(event) => setName(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="lastName"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                bsSize="default" 
                className='mb-3'
                value={lastName}
                onChange={(event) => setSurname(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                bsSize="default" 
                className='mb-3'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                bsSize="default" 
                className='mb-3'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
            <Input
                type="select"
                name="preference"
                id="preference"
                bsSize="default"
                className='mb-5'
                value={preference}
                onChange={(event) => setPreference(event.target.value)}
            >
                <option value="">Select Preference</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
            </Input>
            </FormGroup>
            
            <Button color="dark" block>Sign up</Button>

            {errorMessage && <div className="mt-5 mb-5 fw-bold error-message">{errorMessage}</div>}

          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};


const AccountManagement = () => {
  const [username, setUsername] = useState('');
  const [firstName, setName] = useState('');
  const [lastName, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [preference, setPreference] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Fetch the exact location
  const fetchCityAndCountry = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village;
      const country = data.address.country;
      setLocation(`${city}, ${country}`);
    } catch (error) {
      console.error('Error fetching city and country:', error);
    }
  };

  // Check user authentication status when the component mounts
  useEffect(() => {
    checkAnonymous(navigate);

    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/api/account/');
        setUsername(response.data.username);
        setName(response.data.first_name);
        setSurname(response.data.last_name);
        setEmail(response.data.email);
        setPreference(response.data.preference);
      } catch (error) {
        console.error('An error occurred while fetching user info:', error);
      }
    };

    // Get the user info stored in the DB
    fetchUserInfo();

    // Get user location from localStorage
    const userLocation = JSON.parse(localStorage.getItem('userLocation'));
    if (userLocation) {
      fetchCityAndCountry(userLocation.latitude, userLocation.longitude);
    }

  }, [navigate]);

  const handlePasswordButton = () => {
    navigate('/account-password');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.put('/api/account/', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        preference: preference,
      });
      if (response.status === 200) {
        setIsEditing(false);
      } else {
        console.error('Update user info failed.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.first_name || error.response.data.last_name || error.response.data.email || error.response.data.prefeerence || 'An error occurred while updating the account.');
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };

  return (
    <>
    <div style={{margin: '100px'}}></div>
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="display-5 text-center mb-5">Account Management</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                bsSize="default"
                disabled
                value={username}
              />
            </FormGroup>
            <FormGroup>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  bsSize="default"
                  disabled
                  value={location}
                />
              </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                bsSize="default"
                disabled={!isEditing}
                value={firstName}
                onChange={(event) => setName(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                bsSize="default"
                disabled={!isEditing}
                value={lastName}
                onChange={(event) => setSurname(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                bsSize="default"
                disabled={!isEditing}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
            <Input
                type="select"
                name="preference"
                id="preference"
                bsSize="default"
                className='mb-5'
                value={preference}
                onChange={(event) => setPreference(event.target.value)}
                disabled={!isEditing}
            >
                <option value="">Select Preference</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
            </Input>
            </FormGroup>

            <Button className='mb-3' color="secondary" block onClick={handlePasswordButton}>
              Update Password
            </Button>

            {!isEditing && (
              <Button color="dark" block onClick={handleEdit}>
                Edit Profile
              </Button>
            )}
            
            {isEditing && (
              <Button color="dark" block>
                Save Profile
              </Button>
            )}

            {isEditing && errorMessage && <div className="mt-5 mb-5 fw-bold error-message">{errorMessage}</div>}

          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};


const PasswordManagement = () => {
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Check user authentication status when the component mounts
  useEffect(() => {
    checkAnonymous(navigate);
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/api/account-password/', {
        old_password: old_password,
        new_password: new_password,
      });

      if (response.status === 200) {
        setErrorMessage('Password updated successfully.');
        navigate('/account');
      } else {
        setErrorMessage('Error updating password.');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };

  return (
    <>
    <div style={{margin: '100px'}}></div>
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="display-6 text-center mb-5">Update Password</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="Old Password"
                bsSize="default"
                value={old_password}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                bsSize="default"
                className='mb-5'
                value={new_password}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </FormGroup>

            <Button color="dark" block>Save Password</Button>

            {errorMessage && <div className="mt-5 mb-5 fw-bold error-message">{errorMessage}</div>}

          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};


export { Login, Logout, Signup, AccountManagement, PasswordManagement };
