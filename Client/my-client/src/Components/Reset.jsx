import { useFormik } from "formik";
import React from "react";
import { Toaster } from "react-hot-toast";
import { resetValidatePassword } from "../helpers/validate";
import Classes from "../styles/Username.module.css";

function Reset() {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetValidatePassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value);
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
        <div className={`${Classes.glass} pb-8`}>
          <div className="title flex flex-col items-center">
            <h4 className=" text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              {/* <img className={Classes.profile_img} src={Img} alt="avatar" /> */}
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2"
                type="password"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps("confirmPassword")}
                className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2"
                type="password"
                placeholder="Confirm Password"
              />
              <button className={`${Classes.btn} bg-blue-500`} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
