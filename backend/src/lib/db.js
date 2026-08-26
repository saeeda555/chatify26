import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async()=>{
    try{
        const {MONGO_URI} = ENV;
        if(!MONGO_URI) throw new Error("mongo uri is not set")
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("MONGODB CONNECTED:",conn.connection.host)
    }catch(error){
        console.error("ERROR CONNECTION TO MONGODB:",error)
        process.exit(1)
    }
}