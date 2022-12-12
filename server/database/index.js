const mongoose = require('mongoose');
const connectDatabase=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`database connected`)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
module.exports=connectDatabase;
