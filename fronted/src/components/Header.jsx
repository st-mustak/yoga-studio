import { useEffect, useState } from 'react';
import {Container,Nav,Navbar,} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const items = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
    if (items) {
      setUser(items);
    }
  }, [])
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <LinkContainer to="/"style={{fontSize:"30px"}}><Navbar.Brand >YogaStudio</Navbar.Brand></LinkContainer>
      
      <Nav className="ms-auto">
        <LinkContainer to='/'><Nav.Link href="/">Home</Nav.Link></LinkContainer>
        <LinkContainer to="/about"><Nav.Link>About Us</Nav.Link></LinkContainer>
        {
          user ?
          <LinkContainer to="/profile"><Nav.Link>Profile</Nav.Link></LinkContainer> : <>
          
          <LinkContainer to="/register"><Nav.Link>Register</Nav.Link></LinkContainer>
        <LinkContainer to="/Login"><Nav.Link>Login</Nav.Link></LinkContainer>
          </>
        }
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Header;
