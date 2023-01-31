// // const { SignUp } = require("../../model/userSchema");
// const { unlink } = require("fs");
// const { join } = require("path");
// const createError = require("http-errors");
// const { check, validationResult } = require("express-validator");
// const signUpValidator = [
//   // for name
//   check("user")
//     .isLength({ min: 1 })
//     .withMessage("Name is required*")
//     .isAlpha("en-US", { ignore: " -" })
//     .withMessage("name must be alphabet*"),
//   // for mobile number
//   check("number")
//     .isLength({ min: 1 })
//     .withMessage("Number is required*")
//     .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/)
//     .withMessage("Invalid mobile no*")
//     .custom(async (number) => {
//       try {
//         const numberFromDB = await SignUp.findByNumber(number);
//         if (numberFromDB !== null) throw createError("Number Already Used*");
//       } catch (err) {
//         throw createError(err.message);
//       }
//     }),
//   // for email
//   check("email")
//     .isLength({ min: 1 })
//     .withMessage("Email is required*")
//     .isEmail()
//     .withMessage("Invalid email address*")
//     .custom(async (email) => {
//       try {
//         const emailFromDB = await SignUp.findOne({ email });
//         if (emailFromDB !== null) throw createError("Email Already Used*");
//       } catch (err) {
//         throw createError(err.message);
//       }
//     }),
//   // for password
//   check("password")
//     .isLength({ min: 1 })
//     .withMessage("Password is required*")
//     .isLength({ min: 8 })
//     .withMessage("Password must be 8 char*"),
//   // for cPassword
//   check("cPassword")
//     .isLength({ min: 1 })
//     .withMessage("Confirm Password is required*")
//     .isLength({ min: 8 })
//     .withMessage("Password are not same*")
//     .custom(async (checkPw, { req }) => {
//       try {
//         if (checkPw !== req.body.password) {
//           throw createError("Password are not same*");
//         }
//       } catch (err) {
//         throw createError(err.message);
//       }
//     }),
//   // for avatar
//   check("avatar").custom(async (avatar, { req }) => {
//     try {
//       if (!req.file && req.file === undefined) {
//         throw createError("Avatar not found*");
//       }
//     } catch (err) {
//       throw createError(err.message);
//     }
//   }),
//   // for permission
//   check("permission").custom(async (hasPermission) => {
//     try {
//       if (hasPermission !== "true") {
//         throw createError("Theme & condition required*");
//       }
//     } catch (err) {
//       throw createError(err.message);
//     }
//   }),
// ];
// const signUpValidatorHandler = async (req, res, next) => {
//   //
//   const errors = validationResult(req);
//   const maptedError = errors.mapped();
//   if (Object.keys(maptedError).length === 0) {
//     next();
//   } else {
//     if (req.file) {
//       const { filename } = req.file;
//       unlink(join(__dirname, `/../../public/uploads/${filename}`), (err) => {
//         if (err) console.log(err.message);
//       });
//     }
//     res.status(500).json({
//       errors: {
//         msg: maptedError,
//       },
//     });
//   }
// };
// module.exports = { signUpValidator, signUpValidatorHandler };
