import express from 'express'
import AsyncHandler from 'express-async-handler'
import { Product } from '../models/Product.model.js'
const router =express.Router()

router.get('/', AsyncHandler(
    async(req,res)=>{
        const products=await Product.find({});
        // throw new Error('this is thrown Error')
        res.json(products)
    }
))

router.get('/:id',AsyncHandler(async(req,res)=>{
    try{

        const product=await Product.findById(req.params.id);
        // console.log(`'product',${product}`.yellow)
        if(product){
            res.json(product)
        }else{
            throw new Error('Not Found')
            // res.status(404).json({message:'product not found'})
        }
    }catch(e){
        res.status(500).json(`"Invalid Status Code":  ${e.message}`)
    }
 
}))

export default router