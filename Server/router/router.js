const express = require("express");
const router = express.Router();
const { regiesterMail } = require("../Controllers/mailer");

/***_______  import all routes  ________**/

const {
  signUpController,
  logInController,
  registerMailController,
  getUserController,
  generateOTPController,
  verifyOTPController,
  createResetSessionController,
  updateuserController,
  resetPasswordController,
} = require("../Controllers/controllers");
const { verifyUser } = require("../Middlewares/login/verifyUser");
const { Auth, localVariables } = require("../Middlewares/common/Auth");

/***_______  POST Methods   ________**/
router.post("/login", verifyUser, logInController); // log in app
router.post("/signUp", signUpController); // register user
router.post("/registerMail", verifyUser, regiesterMail); // send the mail
router.post("/authenticate", (req, res, next) => { 
  res.status(200).send("auth user");
}); // authenticate user
/***_______  GET methods  ________**/
router.get("/user/userName", getUserController); // user with userName
router.get("/generateOTP", verifyUser, localVariables, generateOTPController); // genarate OTP
router.get("/verifyOTP", verifyUser, verifyOTPController); // verifyOTP
router.get("/createResetSession", createResetSessionController); // reset all the varables

/***_______  PUT methods  ________**/
router.put("/updateuser", Auth, updateuserController); // is user to update the user profile
router.put("/resetPassword", verifyUser, resetPasswordController); // use to reset password

module.exports = router;
