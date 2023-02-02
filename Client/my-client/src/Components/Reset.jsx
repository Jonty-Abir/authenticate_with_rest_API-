import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { resetPassword } from "../helpers/helper";
import useCustom from "../hooks/useCustom";
import Classes from "../styles/Username.module.css";

function Reset() {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.userDetailsSclice.userName);
  const [{ isLoading, apiData, status, serverError }] = useCustom();
  useEffect(() => {
    console.log(apiData, isLoading);
  }, [apiData, isLoading]);
  /***_______  formik   ________**/
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    // validate: resetValidatePassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      try {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (value.password < 4 || value.confirmPassword.length < 4)
          return toast.error("4 Character must");
        if (value.password !== value.confirmPassword)
          return toast.error("Both Password are not same!");
        if (
          !specialChars.test(value.password) ||
          !specialChars.test(value.confirmPassword)
        )
          return toast.error("Specil character need");
        const promiseReset = resetPassword({
          email: userName,
          password: value.confirmPassword,
        });
        toast.promise(promiseReset, {
          loading: "Updateing...",
          success: <b>Updateing Successfull...</b>,
          error: <b>Couldn't update Password!</b>,
        });
        promiseReset.then(() => {
          return navigate("/password");
        });
      } catch (err) {
        return toast.error("Password update fail!");
      }
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  if (serverError)
    return (
      <code className="text-red-500 font-semibold text-xl">
        {serverError?.message}
      </code>
    );
  if (status && status !== 201)
    return <Navigate to={"/password"} replace={true}></Navigate>;
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
          className={`${Classes.glass} dark:bg-gray-600 dark:text-gray-50 pb-14`}
        >
          <div className="title flex flex-col items-center">
            <h4 className=" text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500 dark:text-gray-300">
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
                className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-500 py-2"
                type="password"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps("confirmPassword")}
                className="px-4 focus:outline-none rounded-md focus:ring-2 focus:ring-green-500 py-2"
                type="password"
                placeholder="Confirm Password"
                required
                minLength={4}
              />
              <button className={`${Classes.btn} bg-blue-500`} type="submit">
                Reset Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
