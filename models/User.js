import { mongoose } from 'mongoose';
const userShema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: String,
    required: true,
    default: false
  },

  },
  {timestamps:true},

)



const User=mongoose.model('User',userShema)
export default User;
