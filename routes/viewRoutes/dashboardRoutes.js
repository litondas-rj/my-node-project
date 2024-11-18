const {
  getDashboard,
  createProfileGetController,
  createProfilePostController,
  editProfileGetController,
  editProfilePostController
  // createProfileGetController,
  // createProfilePostController,
  // editProfileGetController,
  // editProfilePostController
} = require("../../controller/viewController/dashboardController");
const isAuthenticate = require("../../middleware/authenticateMiddleware");
// const {getUpload,postUpload}=require('../../controller/viewController/dashboardController')
const router = require("express").Router();
router.get("/dashboard", isAuthenticate, getDashboard);

router.get("/createprofile",isAuthenticate,createProfileGetController);
router.post("/createprofile",isAuthenticate,createProfilePostController);

router.get("/edit_profile",isAuthenticate,editProfileGetController);
router.post("/edit_profile",isAuthenticate,editProfilePostController);
module.exports = router;
