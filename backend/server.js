import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/product.route.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allows us to accept json data in the req.body ,Middleware

app.use('/api/products',productRoutes);//prexifing all routes with /api/products

app.listen(PORT,()=>{
    connectDB();
    console.log("Server is running on http://localhost:"+PORT);
});