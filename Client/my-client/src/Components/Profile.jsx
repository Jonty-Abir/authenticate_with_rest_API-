import { useFormik } from "formik";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Img from "../assets/profile.png";
import { convertToBase64 } from "../helpers/convert.js";
import { profileValidation } from "../helpers/validate.js";
import Extend from "../styles/Profile.module.css";
import Classes from "../styles/Username.module.css";

function Profile() {
  const [file, setFile] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
    },
    validate: profileValidation,
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
      <div className=" flex justify-center items-center my-6">
        <div className={`${Classes.glass} ${Extend.glass}`}>
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
                  className={`${Classes.profile_img} ${Extend.profile_img}`}
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={`${Extend.textbox} px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2`}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  className={`${Extend.textbox} px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2`}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${Extend.textbox} px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2`}
                  type="text"
                  placeholder="Mobile"
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${Extend.textbox} px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 py-2`}
                  type="email"
                  placeholder="Email*"
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("address")}
                  className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-300 w-full py-2"
                  type="text"
                  placeholder="Address"
                />
              </div>
              <button className={`${Classes.btn} bg-blue-500`} type="submit">
                Update
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?{" "}
                <Link className="text-red-500" to="/">
                  Log Out
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
