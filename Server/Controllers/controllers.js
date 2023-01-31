const UserModle = require("../Model/User.model");
const bcrypt = require("bcrypt");
const { Error } = require("mongoose");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
/***_______POST  Register Controller  http://localhost:8080/signup   ________**/
async function signUpController(req, res, next) {
  try {
    const { userName, email, password, firstName, lastName, avatar } = req.body;
    // check the existing user
    const existUserName = new Promise(async (resolve, reject) => {
      const user = await UserModle.findOne({ userName });
      if (user) reject({ error: "please use uniqe useName" });
      resolve();
    });
    // check the existing email
    const existEmail = new Promise(async (resolve, reject) => {
      const user = await UserModle.findOne({ email });
      if (user) reject({ error: "please use uniqe email address" });
      resolve();
    });

    Promise.all([existEmail, existUserName])
      .then(async () => {
        if (password) {
          const hashPassword = await bcrypt.hash(password, 10);
          const userObj = {
            ...req.body,
            password: hashPassword,
            avatar: avatar || "",
          };
          const user = new UserModle(userObj);
          // console.log(user);
          user
            .save()
            .then(() => {
              res.status(200).json("User Register Succesfull.");
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err?.error });
      });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: err?.message,
      },
    });
  }
}

/***_______ POET Login Controller  http://localhost:8080/login   ________**/

/***_______   login with userName & email  ________**/

async function logInController(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await UserModle.findOne({
      $or: [{ email: email }, { userName: email }],
    });
    if (email && password) {
      if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
          return res.status(400).json({ error: "Ivalid Password" });
        //
        if (validPassword) {
          const token = jwt.sign(
            { userId: user._id, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res
            .status(200)
            .json({ msg: "Login Successfull", userName: user.userName, token });
        }
      }
    } else if (!password) {
      res.status(400).json({ error: "require Password." });
    } else if (!email) {
      res.status(400).json({ error: "require email." });
    } else {
      res.status(400).json({ erro: "user not found." });
    }
  } catch (err) {
    res.status(500).json({ error: { msg: err.message } });
  }
}

/***_______POST  RegisterMail Controller  http://localhost:8080/registerMail   ________**/
function registerMailController(req, res, next) {
  res.json({ msg: "RegisterMail successfull" });
}

/***_______ GET Get User Controller  http://localhost:8080//user/:userName   ________**/
async function getUserController(req, res, next) {
  try {
    const { userName } = req.params;
    if (!userName) return res.status(501).json({ error: "Ivalid user" });
    UserModle.findOne({ userName }, (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(404).json({ error: "Can't found user" });
      const { password, ...rest } = Object.assign({}, user.toJSON());
      res.status(200).json(rest);
    });
  } catch (err) {
    res.status(404).json({ error: "can't find user data." });
  }
}

/***_______ GET generateOTP Controller  http://localhost:8080/generateOTP   ________**/
async function generateOTPController(req, res, next) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  res.status(201).json({ OTP: req.app.locals.OTP });
}

/***_______GET  verifyOTPController  http://localhost:8080/verifyOTP   ________**/
function verifyOTPController(req, res, next) {
  const { code } = req.query;

  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset otp value
    req.app.locals.resetSession = true; // start session for reset password
    res.status(201).json({ msg: "OTP verify Successfull" });
  }
  res.status(400).json({ error: "Invalid OTP!" });
}

/***_______ GET createResetSession controller  http://localhost:8080/createResetSession   ________**/
function createResetSessionController(req, res, next) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; //
    return res.status(201).json({ msg: "access granted" });
  }
  res.status(440).json({ error: "session is expire." });
}

/***_______PUT  updateuser controller  http://localhost:8080/updateuser   ________**/
async function updateuserController(req, res, next) {
  try {
    // i get user auth middleware
    const { userId, userName } = req.user;
    if (userId) {
      const body = req.body;
      // update the user
      UserModle.findByIdAndUpdate(
        { _id: userId },
        body,
        { new: true },
        (err, data) => {
          if (err) throw err;
          if (data) {
            res.status(200).json({
              msg: "User Update Successfull",
              updatedUserDetails: data,
            });
          }
        }
      );
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

/***_______PUT  resetPassword controller  http://localhost:8080/resetPassword   ________**/
async function resetPasswordController(req, res, next) {
  if (!req.app.locals.resetSession)
    return res.status(440).json({ error: "Session is expire..!" });
  try {
    const { email, password } = req.body;
    UserModle.findOne({ email })
      .then((user) => {
        bcrypt
          .hash(password, 10)
          .then((hashPassword) => {
            UserModle.updateOne(
              { email },
              { password: hashPassword },
              (err, data) => {
                if (err) throw err;
                req.app.locals.resetSession = false;
                return res
                  .status(201)
                  .json({ msg: "Record update Successfull..!" });
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ error: "there was server side error" });
          });
      })
      .catch((err) => {
        res.status(404).json({ error: "User was not found" });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  signUpController,
  logInController,
  registerMailController,
  getUserController,
  generateOTPController,
  verifyOTPController,
  createResetSessionController,
  updateuserController,
  resetPasswordController,
};
