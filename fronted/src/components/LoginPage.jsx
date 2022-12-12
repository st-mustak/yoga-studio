import React, { useState } from 'react'
import { Row, Col, Form, Container, Button } from 'react-bootstrap'
import { Link, renderMatches, useNavigate } from 'react-router-dom';
import Message from './Message';
import axios from 'axios';

const LoginPage = () => {
    const [errorMessage,setErrorMessage]=useState('');
    const navigate=useNavigate();
    const [studentInfo, setstudentInfo] = useState({
        email: '',
        password: ''

    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const {email,password}=studentInfo;
        if(!email || !password){
            setErrorMessage('Please fill all details before login');
            return;
        }
        const {data}=await axios.post('/login',studentInfo);
        if(data.isError){
            setErrorMessage(data.message);
            return;
        }
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/profile');
    }
    const handleInputChange = (e) => {
        const name=e.target.name;
        const value=e.target.value;
        setstudentInfo({...studentInfo,[name]:value})
    }
    return (
        <Container className='mt-4'>
            <Row className='justify-content-md-center'>

                <Col xs={12} md={6}>
                {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
                    <h2>Login to your Account</h2>

                    <Form onSubmit={handleSubmit}>


                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                name='email'
                                onChange={handleInputChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='Password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                onChange={handleInputChange}
                                name='password'
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Login
                        </Button>
                    </Form>

                    <Row className='py-3'>
                        <Col>
                            Don't have an Account?{' '}
                            <Link to='/register'>
                                Register
                            </Link>
                        </Col>
                    </Row>

                </Col>

            </Row>
        </Container>
    )
}

export default LoginPage;