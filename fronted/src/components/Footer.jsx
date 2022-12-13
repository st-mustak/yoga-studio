import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-2'>
                    <h5>Copyright &copy; Yoga Studio 2022</h5>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer