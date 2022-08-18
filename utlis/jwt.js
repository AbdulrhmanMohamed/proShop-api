import  Jwt  from "jsonwebtoken";

import dotenv from 'dotenv'
dotenv.config()
export const generateToken=(id)=>{
  return  Jwt.sign({id},process.env.JWT_SECRET)
}