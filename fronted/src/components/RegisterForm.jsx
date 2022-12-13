import React, { useState } from 'react'
import { Row, Col, Form, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Message from './Message';
const RegisterForm = () => {
    const [errorMessage,setErrorMessage]=useState('');
    const [studentInfo, setstudentInfo] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        age: 0,
        batch: '',
        password: ''

    })
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const {name,email,phoneNumber,age,batch,password}=studentInfo;
        if(!name || !email || !phoneNumber || !age || !batch || !password){
            setErrorMessage('Please fill all details before submit');
            return;
        }
        else if(studentInfo.age<18 || studentInfo.age>65){
            setErrorMessage('You are Not eligible');
            return;
        }
        const {data}=await axios.post('/register',studentInfo);
        navigate('/login');
    }
    const handleInputChange = (e) => {
        const name=e.target.name;
        const value=e.target.value;
        setstudentInfo({...studentInfo,[name]:value})
    }
    return (
        <Container className='mt-4'>
            <Row className='justify-content-md-center'>
            {errorMessage && <Message variant='danger'>{errorMessage}</Message>}

                <Col xs={12} md={6}>
                    <h2 className='mt-4 mb-4'><b>Register yourself now at YogaStudio</b></h2>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                name='name'
                                onChange={handleInputChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                name='email'
                                onChange={handleInputChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='number'>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type='Number'
                                placeholder='Enter mobile number'
                                name='phoneNumber'
                                onChange={handleInputChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='age'>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type='Number'
                                placeholder='Enter your age'
                                name='age'
                                onChange={handleInputChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='batch'>
                            <Form.Label>Choose Your Batch</Form.Label>
                            <Form.Select aria-label="Default select example" name='batch' onChange={handleInputChange}>
                                <option value="1">6-7AM</option>
                                <option value="2">7-8AM</option>
                                <option value="3">8-9AM</option>
                                <option value="4">5-6PM</option>

                            </Form.Select>
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

                        <Button type='submit' variant='primary' className='mt-3'>
                            Register
                        </Button>
                    </Form>

                    <Row className='py-3'>
                        <Col>
                            Have an Account?{' '}
                            <Link to='/login'>
                                Login
                            </Link>
                        </Col>
                    </Row>

                </Col>

            </Row>
        </Container>
    )
}

export default RegisterForm;