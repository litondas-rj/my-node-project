module.exports.setLocals=()=>{
    return (req,res,next)=>{
        res.locals.isLoggedin=req.session.isLoggedin
        res.locals.user=req.user
        return next()
    }
}