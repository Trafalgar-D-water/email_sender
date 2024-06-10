const mongoose = require('mongoose');
require('dotenv').config();
require('dotenv').config();

const mongoUri = process.env.MONGO_DB_URI;
const connectDB = async  () =>{
    try{
        await mongoose.connect(mongoUri);
        console.log('database connected')


        
    }  
    catch(error){
        console.log('mongoDB not able connect .....');
        process.exit();
    }
}


module.exports = connectDB;
// connectDB();