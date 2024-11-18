const express=require('express')
const {setRoutes}=require('./routes/routes')
const mongoose=require('mongoose')
const app=express()
const {middlewares}=require('./middleware/middleware')

//MongoDB Url
const MongoDB_URL=`mongodb://${process.env.DB_ADMIN}/node-finalProject`
app.set('view engine','ejs')
app.set('views','views')

middlewares(app)
//All Routes Here
setRoutes(app)
app.use((req,res,next)=>{
    let error=new Error("404 Page Not Found");
    error.status=404
    next(error)
    
})
app.use((error,req,res,next)=>{
    if(error.status===404){
       return res.render('pages/error.ejs',{title:'404 Not Found'}) 
    }
    return res.render('pages/500error.ejs',{title:'500 Server Error'})
})
mongoose.connect(MongoDB_URL).then(()=>{
    const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log('Server & Database Running On This Port',PORT);
    
})
}).catch(e=>{
    console.log('Server error occuard ')
})
