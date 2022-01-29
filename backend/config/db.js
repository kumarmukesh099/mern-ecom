import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(`Mongodb Connected ${connection.connection.host}`);
    } catch (error) {
        console.error("Error while establish Mongodb Connection", error);
        process.exit(1);
    }
}



export default connectDB;