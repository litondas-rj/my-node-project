const multer=require('multer')
const path=require('path')
//set storage for upload photo
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{ 
        cb(null,'public/upload')
     },
     filename:(req,file,cb)=>{
        let ExName=file.fieldname + '-'+Date.now() + '-' + file.originalname 
        cb(null,ExName)
      }
})

//final upload function
const upload=multer({
    storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:(req,file,cb)=>{
        const types=/jpeg|jpg|png|gif/;
        const extname=types.test(path.extname(file.originalname).toLowerCase())
        const mimetype=types.test(file.mimetype)
        if(extname && mimetype){
            cb(null,true)
        }else{
            cb(new Error('Only support images'))
        }
    }
})
module.exports=upload