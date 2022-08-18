import dotenv from 'dotenv'
import express from 'express'
import User from './models/User.js'
import colors from 'colors'
import products from './data/products.js'
import {Product,Reviews} from './models/Product.model.js'
import Order from './models/OrderList.js'
import ConnectDB from './connection.js'
import users from './data/users.js'
dotenv.config()
ConnectDB();

const dataImport=async()=>{

    try{
        // await Product.deleteMany();
        // await Order.deleteMany();
        // await User.deleteMany()
        const createdUser=await User.insertMany(users)
        const adminUser=createdUser[0]._id;
    const sampleProduct= products.map((product)=>{
            return {...product,user:adminUser}
        })
        await Product.insertMany(sampleProduct)
        console.log("DataImported".green.underline.bold)
    }catch(e){
        console.log(`'error',${e.message}`.red.inverse.underline)
    }
}

const dataDestroy=async()=>{
    try{
        await Product.deleteMany();
        await Order.deleteMany();
        await User.deleteMany() 
       console.log('DAta Successfully Removed'.bgRed.white.bold)
    }catch(e){
        console.log('errror',e.message)
    }
}

if(process.argv[2]=='-d'){
    dataDestroy()
}else{
    dataImport()
}