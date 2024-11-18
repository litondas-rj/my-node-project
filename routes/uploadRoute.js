const router=require('express').Router()
const {uploadController}=require('../controller/uploadController')
const upload=require('../middleware/uploadProfile')
router.post('/profilePics',upload.single('profilePics'),uploadController)
module.exports=router