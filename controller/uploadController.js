const User=require('../model/User')
const Profile=require('../model/Profile')
module.exports.uploadController=async(req,res,next)=>{
    if(req.file){
        try {
            let profile=await Profile.findOne({user:req.user._id})
            let profilePics=`/upload/${req.file.filename}` 
            if(profile){
                await Profile.findByIdAndUpdate(
                    {user:req.user._id},
                    {$set:{profilePics}}
                )
                return
            }
            await User.findByIdAndUpdate(
                {_id:req.user._id},
                {$set:{profilePics}}
            )
            res.status(200).json({profilePics})
        } catch (error) {
            res.status(500).json({profilePics:req.user.profilePics})
        }
    }else{
        res.status(500).json({profilePics:req.user.profilePics})
    }
}