const Flash = require("../../utils/flash-message");
const Profile = require("../../model/Profile");

module.exports.getDashboard = async (req, res, next) => {
  try {
    const ProfileData = await Profile.findOne({ user: req.user._id });
    if (!ProfileData) {
      
      return res.redirect("/dashboard/createprofile");
    }
    res.render("pages/dashboard", {
      title: "DashBoard",
      flashMessage: Flash.getMessage(req),
    });
    // res.redirect('/dashboard/create_profile')
  } catch (error) {
    next(error);
  }
};

//Get create profile controller
module.exports.createProfileGetController = async (req, res, next) => {
  try {
    const user = await Profile.findOne({ user: req.user._id });
    if (!user) {
      req.flash("success", "loggedin successfully");
      res.render("pages/dashboard/createProfile", {
        title: "Create Profile",
        flashMessage: Flash.getMessage(req),
      });
    }
    return res.redirect("/dashboard/edit_profile");
  } catch (error) {
    next(error);
  }
};
//Post Create profile controller
module.exports.createProfilePostController = (req, res, next) => {};

//Get Edit Profile Controller
module.exports.editProfileGetController = (req, res, next) => {};
//Post Ddit Profile Controller
module.exports.editProfilePostController = (req, res, next) => {};
