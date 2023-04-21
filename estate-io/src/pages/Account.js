import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import api from '../api';

// Function to check user authentication status
const checkAuthenticationStatus = async (navigate) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const response = await api.get("/api/check_authentication/");
      if (response.data.authenticated) {
        console.log("User is authenticated");
        navigate("/");
      } else {
        console.log("User is not authenticated");
      }
    } else {
      console.log("No access token found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // Check user authentication status when the component mounts
  useEffect(() => {
    checkAuthenticationStatus(navigate);
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
        console.error('Invalid login credentials');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error('Authentication failed');
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
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

const Signup = () => {
  const [username, setUsername] = useState('');
  const [first_name, setName] = useState('');
  const [last_name, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preference, setPreference] = useState('');
  const navigate = useNavigate();

  // Check user authentication status when the component mounts
  useEffect(() => {
    checkAuthenticationStatus(navigate);
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/api/signup/', {
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        preference: preference,
      });
      if (response.status === 201) {
        navigate('/');
      } else {
        console.error('Sign up failed');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Invalid signup data');
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
                type="first_name"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                bsSize="default" 
                className='mb-3'
                value={first_name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="last_name"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                bsSize="default" 
                className='mb-3'
                value={last_name}
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
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export { Login, Signup };
