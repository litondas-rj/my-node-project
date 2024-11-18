const User=require('../../model/User')
const router = require("express").Router();
const { body } = require("express-validator");
const {
  signUpGetController,
  signUpPostController,
  loginGetController,
  loginPostController,
  logoutGetController,
} = require("../../controller/auth/authController");
const {unAuthenticateMiddleware}=require('../../middleware/unAuthenticateMiddleware')
//signup get route
router.get("/signup", signUpGetController);
//Validation Function
const authenticate = [
  body("username")
    .not()
    .isEmpty()
    .withMessage("!username feild is empty")
    .isLength({ min: 3 })
    .withMessage(this.length ? 3 > 0 : "!username is too short")
    .isLength({ max: 15 })
    .withMessage(this.length ? 15 < 16 : "!username is too long")
    .ltrim(),
  body("email")
    .not()
    .isEmpty()
    .withMessage("!Ivalid email")
    .isEmail()
    .withMessage("!give your valid email")
    .normalizeEmail()
    .custom(async email=>{
        const user=await User.findOne({email})
        if(user){
            return Promise.reject('This user email already exist')
        }
    })
    .trim(),
  body("phone")
  .not()
  .isEmpty().withMessage('Enter your a phone number')
  .isLength({min:5,max:19}).withMessage('Invalid your phone number')
  .trim()
  ,
  body("password")
    .not()
    .isEmpty()
    .withMessage("!Please give your password")
    .isLength({ min: 6, max: 8 })
    .withMessage("!give your password must be 6 or 8 character")
    .trim(),
    body('confirmpassword')
    .isLength({min:5}).withMessage('give your password must be 6 charecter')
];
//signup post route
router.post("/signup", authenticate, signUpPostController);
//login get route
router.get("/login",unAuthenticateMiddleware, loginGetController);
const loginAuthenticate=[
  body('email')
  .not().notEmpty().withMessage('Invalid Creadintial')
  .isEmail().withMessage('Invalid Creadintial')
  .custom(async email=>{
    const Match=await User.findOne({email})
    if(!Match){
       return Promise.reject('Invalid Creadintial')
    }
  })
  .normalizeEmail()
  .trim(),
  body('password')
  .not()
  .isEmpty().withMessage('Invalid Creadintial')
  .isLength({min:6,max:8}).withMessage('Invalid Creadintial')
]
//login post route
router.post("/login",loginAuthenticate, loginPostController);
//logout get route
router.get("/logout", logoutGetController);

module.exports = router;
