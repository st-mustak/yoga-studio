const mongoose =require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  name:  String,
  email: String,
  phoneNumber:   Number,
  age:   Number,
  batch: String,
  password: String,
  isPaid:{
    type:Boolean,
    default:false
  }
});
const Student=mongoose.model('Student',studentSchema);
module.exports=Student;