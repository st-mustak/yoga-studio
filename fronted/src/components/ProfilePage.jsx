import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ProfilePage = () => {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [user, setUser] = useState(null);
  const [batchValue, setBatchValue] = useState('');
  const [changeBatch, setChangeBatch] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userInfo'));
    if (!items) {
      navigate('/login');
      return;
    }
    setUser(items);
    setBatchValue(items.batch);
  }, [])

  const navigateToPayment = () => {
    navigate('/payment');
  };

  const batch = {
    "1": '6-7 AM',
    "2": '7-8 AM',
    "3": '8-9 AM',
    "4": '5-6 PM'
  }

  const updateUser=async()=>{
    const info=({...user,batch:batchValue});
    const {data}=await axios.post('/update',info);
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setChangeBatch(false);
    
  }
  const logoutUser=()=>{
    localStorage.removeItem('userInfo');
    navigate('/login');
  }
  return (


    <div class="container emp-profile mt-3">
      {user &&
        <div className='mt-5'>
          <h1 >{user.name}</h1>
          <div class="row">

            <div class="col-md-8" className='mt-4'>
              <div class="tab-content profile-tab" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div class="row">
                    <div class="col-md-6">
                      <label><b>User Id</b></label>
                    </div>
                    <div class="col-md-6">
                      <p><b>{user._id}</b></p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Name</label>
                    </div>
                    <div class="col-md-6">
                      <p>{user.name}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Email</label>
                    </div>
                    <div class="col-md-6">
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div class="col-md-6">
                      <p>{user.phoneNumber}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Age</label>
                    </div>
                    <div class="col-md-6">
                      <p>{user.age}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Current Month </label>
                    </div>
                    <div class="col-md-6">
                      <p>{month[new Date().getMonth()]}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Monthly Fees </label>
                    </div>
                    <div class="col-md-6">
                      <p><b>₹ 500 /=</b></p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Batch</label>
                    </div>
                    <div class="col-md-6">
                      <p>{batch[user.batch]} <Button variant="primary" className='paybtn ms-3' onClick={()=>setChangeBatch(true)}>Change</Button></p> 
                      <p>
                      <span className='ms-3'><span style={{'color': 'red'}}>**
                        </span>Batch will be Updated from next month.</span>
                      </p>
                      
                      {changeBatch && <Form.Group controlId='batch' className='mb-2'>
                            <Form.Label>Choose Your Batch</Form.Label>
                            <Form.Select aria-label="Default select example" name='batch' onChange={(e)=>setBatchValue(e.target.value)}>
                                <option value="1">6-7AM</option>
                                <option value="2">7-8AM</option>
                                <option value="3">8-9AM</option>
                                <option value="4">5-6PM</option>

                            </Form.Select>
                            <Button variant="primary" className='paybtn mt-1' onClick={updateUser}>Save Changes</Button>
                        </Form.Group>
                        
                        }
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Payment Status</label>
                    </div>
                    <div class="col-md-6">
                      <p>{user.isPaid ? <h6 style={{ 'color': 'green' }}><b>Paid</b></h6> : <h6 style={{ 'color': 'red' }}><b>Due</b> <Button variant="success" className='paybtn ms-2' onClick={navigateToPayment}>Pay</Button></h6>}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <Button variant="dark mt-5" onClick={logoutUser}>Logout</Button>
    </div>


  )
}

export default ProfilePage