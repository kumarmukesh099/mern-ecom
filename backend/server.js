import express from 'express';
const app = express();
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import {notFound , errorhandler} from './middleware/errorMiddleware.js'
import path from 'path';
import morgan from 'morgan';


dotenv.config(); //to enable the .env file 
connectDB(); //connect mongodb

const PORT= process.env.PORT || 5000;
console.log("port",process.env.PORT)

app.use(express.json());
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}

app.get('/', (req,res)=>{
    res.send("API is running");
})
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/uploads',uploadRoutes);

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
}) 

const __dirname = path.resolve(); //require in es6, so we mimic it here because not available in es6 module
app.use('/uploads',express.static(path.join(__dirname,'/uploads'))) //making a folder static so that it can loaded in the browser

app.use(notFound);

app.use(errorhandler);

app.listen(PORT,()=>{
    console.log(`Server connected in ${process.env.NODE_ENV} mode on PORT ${PORT}`);
})
