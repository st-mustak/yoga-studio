const asyncHandler = require('express-async-handler');
const Student=require('../models/student');
const shortid = require('shortid');
exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password,phoneNumber,age,batch } = req.body;
    
    const alreadyExists = await Student.exists({ email });
    if (alreadyExists) {
        return res.json('user already registered');
    }
    const user = await Student.create({ name, email, password,phoneNumber,age,batch  });
    if (!user) {
        return next();
    }
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        age:user.age,
        batch:user.batch,
        isPaid:user.isPaid
    });
})

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password} = req.body;
    const user=await Student.findOne({email});
    if(!user){
        return res.json({isError:true,message:'User not exists'});
    }
    const matchPasword=(user.password===password);
    if(!matchPasword){
        return res.json({isError:true,message:'invalid username or password'});
    }
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        age:user.age,
        batch:user.batch,
        isPaid:user.isPaid,
        phoneNumber:user.phoneNumber
    });

})

exports.updateUser = asyncHandler(async (req, res, next) => {
    const { email} = req.body;
    const user=await Student.findOneAndUpdate({email},req.body,{new: true});
    if(!user){
        return res.json({isError:true,message:'User not exists'});
    }
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        age:user.age,
        batch:user.batch,
        isPaid:user.isPaid,
        phoneNumber:user.phoneNumber
    });

})

exports.completePayment = asyncHandler(async (req, res, next) => {
    const { email} = req.body;
    let user=await Student.findOne({email});
    if(!user){
        return res.json({isError:true,message:'User not exists'});
    }
    user.isPaid=true;
    user.paymentId=shortid.generate();
    user=await user.save();
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        age:user.age,
        batch:user.batch,
        isPaid:user.isPaid,
        phoneNumber:user.phoneNumber,
        paymentId:user.paymentId
    });

})