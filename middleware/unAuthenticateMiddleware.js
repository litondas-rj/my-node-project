module.exports.unAuthenticateMiddleware=(req,res,next)=>{
    if(req.session.isLoggedin){
        return res.redirect('/dashboard/dashboard')
    }
    next()
}