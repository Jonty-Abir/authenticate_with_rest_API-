import { useFormik } from "formik";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Img from "../assets/profile.png";
import { convertToBase64 } from "../helpers/convert.js";
import { registerValidattio } from "../helpers/validate.js";
import Classes from "../styles/Username.module.css";

function Register() {
  const [file, setFile] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
    },
    validate: registerValidattio,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value);
      value = await Object.assign(value, { profile: file || "" });
    },
  });

  /***_______   formik does't suport file upload so we need to create this handlear  ________**/
  const upload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

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
        <div className={`${Classes.glass}`}>
          <div className="title flex flex-col items-center">
            <h4 className=" text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to enjoy you.
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profilePicture">
                <img
                  className={Classes.profile_img}
                  src={file || Img}
                  alt="avatar"
                />
              </label>
              <input
                type="file"
                onChange={upload}
                id="profilePicture"
                name="avatar"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2"
                type="email"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("userName")}
                className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2"
                type="text"
                placeholder="User Name*"
              />
              <input
                {...formik.getFieldProps("password")}
                className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2"
                type="password"
                placeholder="Password*"
              />
              <button className={`${Classes.btn} bg-blue-500`} type="submit">
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Already registure{" "}
                <Link className="text-red-500" to="/">
                  Login now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
