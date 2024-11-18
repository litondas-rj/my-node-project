const { validationResult } = require('express-validator')
const User=require('../../model/User')
const errorFormater=require('../../utils/errorFormater')
const Flash=require('../../utils/flash-message')

const bcrypt=require('bcryptjs')
//SignUp Gett Controller
exports.signUpGetController=(req,res,next)=>{
   
    res.render('auth',{
        title:'signUp',
        SubTitle:'SignUp Here ',
        error:{},
        value:{},
        flashMessage:Flash.getMessage(req)
    
    })
}
//SignUp Post Controller
exports.signUpPostController=async(req,res,next)=>{
    const {username,email,phone,password,confirmpassword}=req.body
    const errors=validationResult(req).formatWith(errorFormater)
    if(!errors.isEmpty()){
        req.flash('fail','There have somthing error')
       return res.render('auth',{
            title:'signUp',
            SubTitle:'Create a new one',
            error:errors.mapped(),
            value:{
                username,
                email,
                phone,
                password,
                confirmpassword
            },
            flashMessage:Flash.getMessage(req)
        })
    }
    try {
        let hashPassword=await bcrypt.hash(password,11)
        const user=new User({
            username,
            email,
            phone,
            password:hashPassword,
            confirmpassword:hashPassword
        })
        const create=await user.save()
        if(create){

            req.flash('success','SignUp Complete')
        }
        return res.redirect('/auth/login')
    } catch (e) {
        next(e)
    }
    
}
//Login Get Controller
exports.loginGetController=(req,res,next)=>{
    res.render('auth/login',{
        title:'Login Form',
        SubTitle:'Login Form',
        error:{},
        flashMessage:Flash.getMessage(req)
    })
}
//Login Post Controller
exports.loginPostController=async(req,res,next)=>{
    const {email,password}=req.body
    
    try {
        const errors=validationResult(req).formatWith(errorFormater)
        if(!errors.isEmpty()){
            req.flash('fail','There is have some error')
            return res.render('auth/login',{
                title:'Login Form',
                SubTitle:'Try Again',
                error:errors.mapped(),
                flashMessage:Flash.getMessage(req)
            })
        }
    } catch (error) {
        return console.log('somthing went worng from signIng functon')
    }

    const user=await User.findOne({email})
    if(!user){
        console.log('Invalid Creadintial');
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match){
        console.log('Invalid Creadintial');
    }
    req.session.isLoggedin=true
    req.session.user=user
    req.session.save(err=>{
        if(err){
            console.log(err);
            return next()
        }
        
       res.redirect('/dashboard/dashboard')
    })
}
//Logout get Controller
exports.logoutGetController=(req,res,next)=>{
    req.session.destroy(err=>{
        if(err){
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}