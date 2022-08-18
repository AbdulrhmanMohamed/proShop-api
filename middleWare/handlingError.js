import colors from 'colors'
import { response } from 'express';
export const notFound=async(req,res,next)=>{
    res.status(404);
    res.json("Invalid Request ")
    
}


export const ErrorHandler=async(e,req,res,next)=>{
    const error=e.message;
    console.log(`errorMessage ${e.message}`.red.underline)
    res.status(500);
   res.json({
    error
   })
}
