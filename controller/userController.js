import User from "../models/User.js";
import  AsyncHandler  from 'express-async-handler';
import bcrypt from 'bcryptjs'
import {generateToken} from '../utlis/jwt.js'

export const Register=AsyncHandler(async (req,res)=>{
    
    const {name,email,password}=req.body
    const user =await User.findOne({email})
    if(user){
        res.status(400).json('user Already Exist')
    }
    else{
        try{
            const user=await User.create({
                name,email,password:bcrypt.hashSync(password,10)
            })
            if(user){
                res.status(201).json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    token:generateToken(user._id)
                })
            }
        }catch(e){
            res.status(400).json('invalid data For User')
        }
        
    }
    
})
export const Login=AsyncHandler(
    async(req,res)=>{
        const {email,password}=req.body;
        const user =await User.findOne({email})
        if(user){
            if(bcrypt.compareSync(password,user.password)){
                res.status(200).json({
                    name:user.name,
                    id:user._id,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:generateToken(user._id)
                })
            }
            else{res.status(401).json('Invalid Password')}
        }
        else{
            res.status(404).json("user is Not Found")
        }
    }
)


export const getUserProfile=AsyncHandler(async(req,res)=>{
    const {id}=req.user;
   
    try{

        const user=await User.findById(id).select('-password')
        if(user){
            res.status(200).json(user)
            
        }
    }
    catch(e){
        res.status(500).json(e.message)
    }    
    
    
})

export const updataUserProfile=AsyncHandler(async(req,res)=>{
    const id=req.user._id;
    
    try{

        const user=await User.findById(id)
       
        if(user.name){
            const{name,email,password}=req.body;

            user.name=name?name:user.name;
            user.email=email?email:user.email;
            if(password){
                user.password=bcrypt.hashSync(password,10);
                console.log(user.password);
                console.log(password)
            }
            
          const updatedUser= await user.save()
          console.log('updated',updatedUser)
          res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            password:updatedUser.password,
            token:updatedUser.token
          })
        }
        else{
            res.status(404).json("User Not Found")
        }
    }catch(e){
        res.json(e)
    }


})


export const UserPorfile= AsyncHandler(async (req,res)=>{
    const id =req.params.id;
    const user=await User.findById(id)
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(401).json('Some thing Went Wrong , invalid id for the profile');
    }
})