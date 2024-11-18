const { Schema, model } = require("mongoose");

const UserSchema=new Schema({
    username:{
        type:String,
        minlength:3,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:'Profile'
    },
    profilePics:{
        type:String,
        default:'/uploads/default.png'
    }
},{timestamps:true})

const User=model('User',UserSchema)
module.exports=User