import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const ConnectDB=()=>{
            
            mongoose.connect(process.env.MONGO_URI,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
               
            }).then(()=>console.log('SuccessFully Connected'.green.underline.bold))
        .catch(e=>console.log(`'error',${e.message}`.red.underline.bold))
    
}
export default ConnectDB