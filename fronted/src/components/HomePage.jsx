import React from 'react'
import { Row, Col, Form, Container, Button } from 'react-bootstrap'

import { useNavigate} from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate('/register');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };


  return (
  
            <Container className='homepage d-flex justify-content-center align-items-center'>
               <div className='child d-flex justify-content-around align-items-center flex-column'>
                <div className="heading">
                  <h1>Welcome to Yoga Studio</h1>
                </div>
                <div className="d-flex justify-content-around align-items-center flex-column">
                <Button variant="dark buttons mb-3" onClick={navigateToRegister}>Join With Us</Button>
                <Button variant="dark buttons mt-2" onClick={navigateToLogin}>Login</Button>
                </div>
               </div>
            </Container>
  )
}

export default HomePage;