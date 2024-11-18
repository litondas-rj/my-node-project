const { Schema, model } = require("mongoose");

const ProfileSchema=new Schema({
    user:{
       type:Schema.Types.ObjectId,
       ref:'User',
       required:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    title:{
        type:String,
        maxlength:100,
        minlength:3,
        trim:true
    },
    bio:{
        type:String,
        maxlength:500,
        trim:true
    },
    profilePic:String,
    links:{
        website:String,
        facebook:String,
        twitter:String,
        github:String,
        linkdin:String
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
},{timestamps:true})
const Profile=model('Profile',ProfileSchema)
module.exports=Profile