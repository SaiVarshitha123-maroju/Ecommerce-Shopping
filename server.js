import express from 'express';
import colors from 'colors';
import dotenv from'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRouter from './routes/authRouter.js';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoute from './routes/productRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const app=express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoute)
app.use(express.static(path.join(__dirname,'/client/build')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'))
});

//PORT
const PORT= process.env.PORT || 8000;
//run listen
app.listen(PORT, ()=>{
    console.log(`Server Running on mode ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
});