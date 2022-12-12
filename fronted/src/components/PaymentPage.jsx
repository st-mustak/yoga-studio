import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userInfo'));
    const completePayment=async()=>{
      const {data}=await axios.post('/payment',items);
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
    if (!items) {
      navigate('/login');
    }
    setUser(items);
    if(user && !user.isPaid){
      completePayment();
    }
  }, [])

  
  return (
   <>
   {
    user.paymentId? <div className='text-center mt-5'>Payment Done
     <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Payment Details</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Transaction Id</Col>
                  <Col>{user.paymentId}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Amount</Col>
                  <Col>₹ 500</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status </Col>
                  <Col>completed</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
    
    </div>:<div className='text-center mt-5'>Wait! You are redirecting to Razorpay Payment page...</div>
   }
   </>
  )
}

export default PaymentPage