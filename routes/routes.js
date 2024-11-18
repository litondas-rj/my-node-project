const authRoutes=require('../routes/auth/authRoutes')
const dashboardRoutes=require('../routes/viewRoutes/dashboardRoutes')
const  uploadRoute=require('../routes/uploadRoute')
const routes=[
    {
        path:'/auth',
        controller:authRoutes
    },
    {
        path:'/dashboard',
        controller:dashboardRoutes
    },
    {
        path:'/upload',
        controller:uploadRoute
    },
    {
        path:'*',
        controller:(req,res,next)=>{
            res.render('pages/error',{title:'404 Not Found'})
        }
    }
]

module.exports.setRoutes=(app)=>{
    routes.forEach(r=>{
        if(r.path==='/'){
           return app.get(r.path,r.controller)
        }
        app.use(r.path,r.controller)
    })
}