import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './connection.js';
// import cors from "cors"
import ProductRouter from './routes/ProductRoutes.js'
import  colors from 'colors'
import { ErrorHandler, notFound } from './middleWare/handlingError.js';
import  UserRoute from './routes/userRoutes.js'
import OrderRoute from './routes/orderRoutes.js'
ConnectDB();
const app=express()
app.use(express.json())
dotenv.config()
app.get('/',(req,res)=>{
    res.send("This is The root directory")
})

app.use('/api/products',ProductRouter);
// middle ware for error handling 
// app.use(notFound)

// app.use(ErrorHandler)

app.use('/api/users',UserRoute)
app.use('/api/orders',OrderRoute)

app.listen(process.env.PORT,()=>{
    console.log(`The server Running Successfully on port ${process.env.PORT}`.cyan.underline)
})
