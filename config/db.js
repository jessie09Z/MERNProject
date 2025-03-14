import mongoose from "mongoose";
import config from "config";

const db = config.get("mongoURL");


const connectDB = async ()=>{
    try{
        
       await mongoose.connect(db);
       console.log("mongodb connected")
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
// Exit process with failure
    }

}


 export default connectDB;