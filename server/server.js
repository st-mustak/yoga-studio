const express=require('express');
const app=express();
const connectDatabase=require('./database');
const path=require('path')
require('dotenv').config({path:'server/.env'})
const { registerUser, loginUser, updateUser, completePayment } = require('./controller/auth');
const PORT=process.env.PORT || 5000;
connectDatabase();
app.use(express.json());

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '../','/fronted/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, '../','fronted', 'build', 'index.html'))
    )
  }
app.post('/register',registerUser);
app.post('/login',loginUser);
app.post('/update',updateUser);
app.post('/payment',completePayment);
app.listen(PORT,()=>console.log(`listening to ${PORT}`))
