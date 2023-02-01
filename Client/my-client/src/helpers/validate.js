import toast from "react-hot-toast";
import { authenticate } from "../helpers/helper";

/***_______  email for login validate   ________**/
const userVerify = (error = {}, value) => {
  const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
    value?.email
  );
  if (!value?.email) {
    error.email = toast.error("email is require*");
  } else if (value.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!isValid) {
    error.email = toast.error("Invalid email!");
  }
  return error;
};

/***_______  valid userlogin page   ________**/

async function emailValidate(values) {
  const errors = userVerify({}, values);
  if (values.email) {
    // check user is exist or not
    const { status } = await authenticate(values.email);
    if (status !== 200) {
      toast.error("user doesn't exist..!");
    }
  }
  return errors;
}

/***_______ verify password ________**/
const passwordVerify = (error = {}, value) => {
  // eslint-disable-next-line no-useless-escape
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!value?.password) {
    return (error.password = toast.error("Password is require*"));
  }
  if (value.password.length <= 4) {
    return (error.password = toast.error("4 character must."));
  }
  if (!specialChars.test(value.password)) {
    return (error.password = toast.error(
      "Password must have special character."
    ));
  }
  return error;
};

/***_______  validate password   ________**/

const validatePassword = async (value) => {
  const errors = passwordVerify({}, value);
  return errors;
};
/***_______     ________**/
const validUserName = async (error = {}, value) => {
  if (!value?.userName) {
    return (error.email = toast.error("userName is require*"));
  } else if (value.userName.includes(" ")) {
    return (error.email = toast.error("Invalid UserName.!"));
  }
};

/***_______  validate register page   ________**/
const registerValidattio = async (value) => {
  const errors = userVerify({}, value);
  validUserName(errors, value);
  passwordVerify(errors, value);
  return errors;
};

async function resetValidationPw(error={},value){
  if(!value.password || !value.confirmPassword){
    error.password= toast.error("Both Field's are require*");
  } if(value.password.length <= 4 || value.confirmPassword.length <=4 ){
    error.password= toast.error("4 character must...");
  }
}
/***_______  validate password reset  ________**/

const resetValidatePassword = (value) => {
  const errors = resetValidationPw({}, value);
  if (value?.password !== value?.confirmPassword) {
    errors.exist = toast.error("Password are not same..!");
  }
  return;
};

/***_______  profile page validation   ________**/
const profileValidation = async (values) => {
  const errors = userVerify({}, values);
  return errors;
};

export {
  emailValidate,
  validatePassword,
  resetValidatePassword,
  registerValidattio,
  profileValidation,
};

