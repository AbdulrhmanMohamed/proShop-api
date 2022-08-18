import User from "../models/User.js"
import  Jwt  from "jsonwebtoken"
import  AsyncHandler  from 'express-async-handler';
export const Protect=AsyncHandler( async(req,res,next)=>{
    
    const token=req.headers.authorization;
    if(token && token.startsWith('Bearer')){
        let splitToken=token.split(' ')[1];
        let verifyToken;
        try{

             verifyToken= Jwt.verify(splitToken,process.env.JWT_SECRET)
             req.user=await User.findById(verifyToken.id).select('-password')
             
             next()
        }catch(e){
            res.status(404).json('InValid Token')
        }
        // console.log('token',verifyToken)
     
    }
    else{
        res.status(401);
        res.json('unAuthorized , no Token')
    }
    

})