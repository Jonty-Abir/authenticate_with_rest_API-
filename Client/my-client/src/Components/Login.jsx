import { useFormik } from "formik";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Img from "../assets/profile.png";
import { getUser } from "../helpers/helper";
import { emailValidate } from "../helpers/validate.js";
import { setStateStore } from "../state/state";
import Classes from "../styles/Username.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: emailValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      dispatch(setStateStore(value.email));
      const { data } = await getUser({
        userName: `userName?userName=${value.email}`,
      });
      if (data?.email) {
        navigate("/password");
      } else {
        toast.error("user not found!");
      }
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
        }}
        reverseOrder={false}
      ></Toaster>
      <div className=" flex justify-center items-center h-screen">
        <div className={`${Classes.glass} dark:bg-gray-800  `}>
          <div className="title flex flex-col items-center">
            <h4 className=" text-5xl font-bold dark:text-gray-50">
              Hello Again
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500 dark:text-gray-300">
              Explore More by Connecting with us.
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={Classes.profile_img} src={Img} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-500 py-2"
                type="text"
                placeholder="enter your email*"
              />
              <button className={`${Classes.btn} bg-blue-500`} type="submit">
                Let's go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{" "}
                <Link className="text-red-500 ml-2" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
