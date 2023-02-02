import { useFormik } from "formik";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Img from "../assets/profile.png";
import { verifyPassword } from "../helpers/helper";
import { validatePassword } from "../helpers/validate.js";
import useHook from "../hooks/useFetch";
import Classes from "../styles/Username.module.css";

function Password() {
  const navigate = useNavigate();
  const { userName } = useSelector((state) => {
    return state.userDetailsSclice;
  });

  // call our custom hook
  const [{ apiData, isLoading, serverError }] = useHook(
    `/user/userName?userName=${userName}`
  );

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: validatePassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      let loginPromise = verifyPassword({ userName, password: value.password });
      toast.promise(loginPromise, {
        loading: "Loging...",
        success: <b>Login Successfull...</b>,
        error: <b>Could not login!</b>,
      });
      loginPromise.then((data) => {
        const {
          data: { token },
        } = data;
        localStorage.setItem("token", token);
        const clear = setTimeout(() => {
          navigate("/profile");
          cancel();
        }, 1400);
        const cancel = () => {
          clearTimeout(clear);
        };
      });
    },
  });
  if (serverError) return <code className="text-red-500">{serverError}</code>;
  ///***_______  lading components   ________**/

  if (isLoading)
    return <h2 className="text-gray-800 font-bold text-xl">Loading...</h2>;
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
        <div
          className={`${Classes.glass}  dark:bg-gray-800 dark:text-gray-300`}
        >
          <div className="title flex flex-col items-center">
            <h4 className=" text-4xl font-bold">Hello {apiData?.firstName}</h4>
            <span className="py-4 text-lg dark:bg-gray-800 dark:text-gray-400 w-2/3 text-center text-gray-500">
              Explore More by Connecting with us.
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                className={Classes.profile_img}
                src={apiData?.avatar || Img}
                alt="avatar"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-600 text-gray-700 py-2"
                type="password"
                placeholder="enter your password"
              />
              <button className={`${Classes.btn} bg-blue-500`} type="submit">
                Sign In
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-300">
                Forgot Password{" "}
                <Link className="text-red-600 font-bold ml-2" to="/recovery">
                  Reset Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;
