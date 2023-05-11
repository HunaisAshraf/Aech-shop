import mongoose from 'mongoose';

const connectDb = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongoDB database ${conn.connection.host}`);
    } catch (error) {
        console.log(`errorin mongoDb ${error}`);
    }
}

export default connectDb;