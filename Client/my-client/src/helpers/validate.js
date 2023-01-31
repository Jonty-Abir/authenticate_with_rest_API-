import toast from "react-hot-toast";

/***_______  email for login validate   ________**/

const userVerify = (error = {}, value) => {
  const isValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email);
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

  return errors;
}

/***_______ verify password ________**/
const passwordVerify = (error = {}, value) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!value?.password) {
    error.password = toast.error("Password is require*");
  } else if (value.password.length < 4) {
    error.password = toast.error(
      "Password must be more than 4 character long."
    );
  } else if (!specialChars.test(value.password)) {
    error.password = toast.error("Password must have special character.");
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
    error.email = toast.error("userName is require*");
  } else if (value.userName.includes(" ")) {
    error.email = toast.error("Invalid UserName.!");
  }
};

/***_______  validate register page   ________**/
const registerValidattio = async (value) => {
  const errors = userVerify({}, value);
  validUserName(errors, value);
  passwordVerify(errors, value);
  return errors
};

/***_______  validate password reset  ________**/

const resetValidatePassword = (value) => {
  const errors = passwordVerify({}, value);
  if (value?.password !== value?.confirmPassword) {
    errors.exist = toast.error("Password are not same..!");
  }
  return;
};

/***_______  profile page validation   ________**/
const profileValidation= async(values)=>{
  const errors= userVerify({},values);
  return errors
};

export {
  emailValidate,
  validatePassword,
  resetValidatePassword,
  registerValidattio,
  profileValidation
};

