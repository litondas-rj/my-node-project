const User=require('../model/User')
module.exports.bindUserWithSession=()=>{
    return async(req,res,next)=>{
        if(!req.session.isLoggedin){
            console.log('error from bind user with session function');
            
            return next()
        }
        const user=await User.findById(req.session.user._id)
        req.user=user
        return next()
        
    }
}