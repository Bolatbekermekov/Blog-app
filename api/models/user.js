import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const user = new mongoose.Schema({
  
  username:{
    type: String,
    required:[true,"Plese provide a username"],
    minlength:3,
    maxlength:50,
  },

  email:{
    type:String,
    unique:true,
    required:[true,'Plese provide email'],
    validate:{
      validator:validator.isEmail,
      message:"Plese provide valid email"
    }
  },

  password:{
    type: String,
    required:[true,"Plese provide a email and password"],
    minlength:6,
  }

},{
  timestamps:true}
  )

  user.pre('save',async function(){
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
  })

  const User = mongoose.model('User',user)

  export default User;