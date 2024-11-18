const express=require('express')
require('dotenv').config()
const morgan=require('morgan')
const session=require('express-session')
const flash=require('connect-flash')
const MongoDBStore=require('connect-mongodb-session')(session)
const {bindUserWithSession}=require('./bindUserWithSession')
const {setLocals}=require('./setLocals')

const MongoDB_URL=`mongodb://${process.env.DB_ADMIN}/node-finalProject`
const store=new MongoDBStore({
    uri:MongoDB_URL,
    collection:'Auth-Session'
})
const middleware=[
    express.urlencoded({extended:true}),
    express.json(),
    morgan('dev'),
    express.static('public'),
    session({
        secret:process.env.SECRET_KEY||'SECRET_KEY',
        resave:false,
        saveUninitialized:false,
        store:store
    }),
    flash(),
    bindUserWithSession(),
    setLocals()
]
module.exports.middlewares=(app)=>{
    middleware.forEach(m=>{
        app.use(m)
    })
}